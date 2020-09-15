import React, { useState, useEffect } from 'react';

import { Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web'

import TeamCell from '../TeamCell';

import apiClient from '../../api';
import { SUPPORTED_LEAGUES } from '../../constants';

const PredictionModal = ({ league, onBackDropPress, visible }) => {
  const [teams, setTeams] = useState([]);
  const { leagueID, leagueName } = league || {};


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
                />
              ))
            ) : (
              <Text>Loading state...</Text>
            )
          }
        </View>

        {/* Overlay Footer */}
        <View>
          <Button title="Next" />
        </View>
      </View>
    </Overlay>
  )
};

export default PredictionModal;
