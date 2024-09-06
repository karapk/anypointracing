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


app.post('/races', (req, res) => {
  console.log('Received request:', req.body);
  const receivedToken = req.body.token;
  console.log('Received token:', receivedToken);
  // Check if there is an existing active race
  // if (currentActiveRaceId && myDb.races.has(currentActiveRaceId)) {
  //   console.log(`Reusing existing race: ${currentActiveRaceId}`);
  //   return res.json({ id: currentActiveRaceId, racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36" });
  // }

  // If no active race, start a new race
  const raceId = uuidv4();
  myDb.races.set(raceId, [receivedToken]); // Initialize with the starting token
  currentActiveRaceId = raceId;  // Update the current active race ID

  const toSend = {
    id: raceId,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36",
  };

  console.log('Race started:', toSend);
  res.json(toSend);
});

// Endpoint to handle lap completion
app.post('/races/:id/laps', (req, res) => {
  const raceId = req.params.id;
  console.log('raceId:', raceId);
  const receivedToken = req.body.token;
  console.log('Received token/laps:', receivedToken);

  if (!myDb.races.has(raceId)) {
    console.log(`Race ID ${raceId} not found.`);
    return res.status(404).json({ error: 'Race ID not found' });
  }

  const tokens = myDb.races.get(raceId);
  console.log('Tokens:', tokens);

  if (!tokens || tokens.length === 0) {
    console.log(`No tokens found for Race ID ${raceId}.`);
    return res.status(404).json({ error: 'No tokens found for this race' });
  }


  tokens.push(receivedToken);
  myDb.races.set(raceId, tokens);

  
  const previousToken = tokens[tokens.length - 2];

  if (!previousToken) {
    return res.status(400).json({ error: 'No valid token to return' });
  }

  const toSend = {
    token: previousToken,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36",
  };

  console.log('Lap completed:', toSend);
  res.json(toSend);
});

// Welcome endpoint
app.get('/', (req, res) => { 
  res.send('Welcome to Anypoint racing! 🚗💨');
});

module.exports = app;
