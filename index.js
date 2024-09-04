const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(express.json());


const myDb = {
  races: new Map(),
};

let currentActiveRaceId = null;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//starting a new race endpoint
app.post('/races', (req, res) => {
  const receivedToken = req.body.token;
  
  if (currentActiveRaceId && myDb.races.has(currentActiveRaceId)) {
    console.log(`Reusing existing race: ${currentActiveRaceId}`);
    return res.json({ id: currentActiveRaceId, racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36" });
  }
  // for (const [raceId, tokens] of myDb.races.entries()) {
  //   if (tokens.length > 0 && tokens[0] === undefined) {
  //     // If a race is already started but doesn't have any valid token yet, use this race
  //     console.log(`Reusing existing race: ${raceId}`);
  //     return res.json({ id: raceId, racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36" });
  //   }
  // }
  
  //starting a new race if no active race is found
  const raceId = uuidv4();
  myDb.races.set(raceId, [receivedToken]);
  currentActiveRaceId = raceId;

  const toSend = {
    id: raceId,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36", // Hardcoded for now
  };

  console.log('Race started:', toSend);
  res.json(toSend);
});

//lap completion endpoint
app.post('/races/:id/laps', (req, res) => {
  const raceId = req.params.id;
  const receivedToken = req.body.token;


  if (!myDb.races.has(raceId)) {
    console.log(`Race ID ${raceId} not found.`);
    return res.status(404).json({ error: 'Race ID not found' });
  }

  
  const tokens = myDb.races.get(raceId);

  if (!tokens || tokens.length === 0) {
    console.log(`No tokens found for Race ID ${raceId}.`);
    return res.status(404).json({ error: 'No tokens found for this race' });
  }

  tokens.push(receivedToken);
  myDb.races.set(raceId, tokens);

  const tokenToReturn = tokens[tokens.length - 2];

  if (!tokenToReturn) {
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