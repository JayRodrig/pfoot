import React, { useState, useEffect } from 'react';

import { Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Modal from 'modal-react-native-web'

import TeamCell from '../TeamCell';

import apiClient from '../../api';
import { SUPPORTED_LEAGUES } from '../../constants';

const PredictionModal = ({ onBackDropPress, visible }) => {
  const [teams, setTeams] = useState([]);
  const [league, setLeague] = useState(undefined);


  useEffect(() => {
    const fetchData = async () => {
      const teamsByLeague = await apiClient.getTeamsByLeagueId(2790);
      setLeague(2790);
      setTeams(teamsByLeague);
    };

    fetchData();
  }, []);

  return(
    <Overlay isVisible={visible} ModalComponent={Modal} onBackdropPress={onBackDropPress} overlayStyle={{ padding: 0 }}>
      <View style={{ height: '50vh', width: '80vw', overflow: 'auto' }}>

        {/* Overlay Header */}
        <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'yellow', borderColor: 'red', borderWidth: '1px'}}>
          <Text style={{ fontSize: 36, fontWeight: 150 }}>{SUPPORTED_LEAGUES[2790]}</Text>
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
            ) : null
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
