import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";

import TeamCell from "../TeamCell";
import apiClient from "../../api";
import firebase from "../../firebase";
import { AuthContext } from "../../store";

// global variables
const db = firebase.firestore();

const PredictionModal = ({
  league,
  onBackDropPress,
  userPredictions,
  setUserPredictions,
  visible,
}) => {
  // refactor this to be selectedTeam: string
  const [prediction, setPrediction] = useState(undefined);
  const [teams, setTeams] = useState([]);
  const [authUser] = useContext(AuthContext);
  const { leagueID, leagueName } = league || {};

  useEffect(() => {
    setPrediction();
  }, [visible]);

  useEffect(() => {
    if (league) {
      const fetchData = async () => {
        const teamsByLeague = await apiClient.getTeamsByLeagueId(leagueID);
        setTeams(teamsByLeague);
      };

      fetchData();
    }
  }, [league, leagueID]);

  const handleOnSavePrediction = async (e) => {
    const {
      user: { userID },
    } = authUser;
    const userData = await apiClient.getUserData(authUser);
    if (userData) {
      const { team } = prediction || {};
      const userWithUpdatedPredictions = {
        ...userData,
        predictions: {
          ...userData.predictions,
          [leagueName]: team,
        },
      };

      setUserPredictions({
        ...userPredictions,
        [leagueName]: team,
      });

      const dbDocRef = db.collection("users").doc(userID);
      await dbDocRef.set(userWithUpdatedPredictions);

      setPrediction();
      onBackDropPress();
    }
  };

  return (
    <Overlay
      isVisible={visible}
      ModalComponent={Modal}
      onBackdropPress={onBackDropPress}
      overlayStyle={{ padding: 0 }}
    >
      <View style={{ height: "50vh", width: "80vw", overflow: "auto" }}>
        {/* Overlay Header */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ fontSize: 36, fontWeight: 150 }}>{leagueName}</Text>
        </View>

        {/* Overlay Body */}
        <View
          style={{
            backgroundColor: "green",
            paddingVertical: "1vh",
            paddingHorizontal: "5vw",
          }}
        >
          {!!teams.length ? (
            teams.map((team, index) => (
              <TeamCell
                key={index}
                avatarUrl={team.avatarUrl}
                title={team.name}
                disabled={!!prediction}
                setPrediction={setPrediction}
                visible={visible}
                team={team}
              />
            ))
          ) : (
            <Text>Loading state...</Text>
          )}
        </View>

        {/* Overlay Footer */}
        <View>
          <Button
            title="Save"
            disabled={!prediction}
            onPress={handleOnSavePrediction}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default PredictionModal;
