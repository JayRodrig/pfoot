import firebase from '../firebase';

// global variables
const db = firebase.firestore();

export default {
  getTeamsByLeagueId: async (leagueID) => {
    try {
      const teamsCall = await fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/league/${leagueID}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": "152e0cdc26msh98d504390075f2dp1eeb72jsn4ab228d3c452"
        }
      });
      const { api: { teams } } = await teamsCall.json();
      console.log('teams: ', teams)
      return teams.map((team) => ({
        teamID: team.team_id,
        avatarUrl: team.logo,
        name: team.name,
        venueName: team.venue_name,
        venueCapacity: team.venue_capacity,
        founded: team.founded,
        teamCountry: team.country
      }));
    } catch (err) {
      return new Error(err);
    }
  },

  getUserData: async (authUser) => {
    const { user } = authUser
    try {
      const snapshot = await db.collection('users').get();
      let userData;

      snapshot.forEach((doc) => {
        if (doc.data().userID === user.userID) {
          userData = doc.data();
        };
      });

      return userData;
    } catch (err) {
      console.log(err);
    }
  },

  getUserPredictions: async (authUser) => {
    const { user } = authUser || {};
    try {
      const snapshot = await db.collection('users').get();
      let userData;

      snapshot.forEach((doc) => {
        if (doc.data().userID === user.userID) {
          userData = doc.data();
        };
      });

      return userData.predictions;
    } catch (err) {
      console.log(err);
    }
  },
};
