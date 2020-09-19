import React, { useState, useEffect } from 'react';

import { Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web'

import TeamCell from '../TeamCell';

import apiClient from '../../api';

const PredictionModal = ({ league, onBackDropPress, visible }) => {
  const [prediction, setPrediction] = useState(undefined);
  const [teams, setTeams] = useState([]);
  const { leagueID, leagueName } = league || {};

  useEffect(() => {
    setPrediction()
  }, [visible])

  useEffect(() => {
    if (league) {
      const fetchData = async () => {
        const teamsByLeague = await apiClient.getTeamsByLeagueId(leagueID);
        setTeams(teamsByLeague);
      };

      fetchData();
    }
  }, [league, leagueID]);

  return(
    <Overlay isVisible={visible} ModalComponent={Modal} onBackdropPress={onBackDropPress} overlayStyle={{ padding: 0 }}>
      <View style={{ height: '50vh', width: '80vw', overflow: 'auto' }}>

        {/* Overlay Header */}
        <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'yellow', borderColor: 'red', borderWidth: '1px'}}>
          <Text style={{ fontSize: 36, fontWeight: 150 }}>{leagueName}</Text>
        </View>

        {/* Overlay Body */}
        <View style={{ backgroundColor: 'green', paddingVertical: '1vh', paddingHorizontal: '5vw' }}>
          {
            !!teams.length ? (
              teams.map((team, index) => (
                <TeamCell
                  key={index}
                  avatarUrl={team.avatarUrl}
                  title={team.name}
                  disabled={!!prediction}
                  setPrediction={setPrediction}
                  visible={visible}
                />
              ))
            ) : (
              <Text>Loading state...</Text>
            )
          }
        </View>

        {/* Overlay Footer */}
        <View>
          <Button title="Save" disabled={!prediction} />
        </View>
      </View>
    </Overlay>
  )
};

export default PredictionModal;
