const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(express.json());


const myDb = {
  races: new Map(),
};

// let currentActiveRaceId = null;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//starting a new race endpoint
app.post('/races', (req, res) => {
  console.log('Starting', req.body);
  const receivedToken = req.body.token;
  console.log('Received token:', receivedToken);
  
  // if (currentActiveRaceId && myDb.races.has(currentActiveRaceId)) {
  //   console.log(`Reusing existing race: ${currentActiveRaceId}`);
  //   return res.json({ id: currentActiveRaceId, racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36" });
  // }
  // for (const [raceId, tokens] of myDb.races.entries()) {
  //   if (tokens.length > 0 && tokens[0] === undefined) {
  //     // If a race is already started but doesn't have any valid token yet, use this race
  //     console.log(`Reusing existing race: ${raceId}`);
  //     return res.json({ id: raceId, racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36" });
  //   }
  // }
  
  //starting a new race if no active race is found
  const raceId = uuidv4();
  const newTokenInfo = {
  
      isNewLap: true,
      currentVal: receivedToken,
    
  }
  myDb.races.set(raceId, newTokenInfo);
  // currentActiveRaceId = raceId;

  const toSend = {
    id: raceId,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36", // Hardcoded for now
  };

  console.log('Race started:', toSend);
  console.log('myDb', myDb)
  res.json(toSend);
});

//lap completion endpoint
app.post('/races/:id/laps', (req, res) => {
  console.log('Lap completion', req.body);
  const raceId = req.params.id;
  console.log('req.params', req.params)
  // const receivedToken = req.body.token;
  // console.log('receivedToken', receivedToken)
 
  console.log('myDb', myDb)
  if (!myDb.races.has(raceId)) {
    console.log(`Race ID ${raceId} not found.`);
    return res.status(404).json({ error: 'Race ID not found' });
  }

  
  const tokenInfo = myDb.races.get(raceId);

  const newTokenInfo = {
      isNewLap: false,
      currentVal: tokenInfo.currentVal,
  }

  myDb.races.set(raceId, newTokenInfo);
  console.log('myDb', myDb)

  // if (!token) {
  //   console.log(`No tokens found for Race ID ${raceId}.`);
  //   // myDb.races.set(raceId, []);
  //   return res.status(404).json({ error: 'No tokens found for this race' });

  // }

  // tokens.push(receivedToken);
  // myDb.races.set(raceId, tokens);
  if (tokenInfo.isNewLap) {
    return res.json({
      racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36"
    })
  }
  const tokenToReturn = newTokenInfo.currentVal;

  if (!tokenToReturn) {
    console.log('no token to return')
    return res.status(400).json({ error: 'No valid token to return' });
  }

  const toSend = {
    token: tokenToReturn,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36", 
  };

  console.log('Lap completed:', toSend);
  res.json(toSend);
});

app.get('/', (req, res) => { 
  res.send('Welcome to Anypoint racing! 🚗💨');
 });


module.exports = app;