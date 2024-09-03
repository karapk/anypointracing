const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const db = require('./db'); 

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post('/races', (req, res) => {
  const receivedToken = req.body.token;
  const raceId = uuidv4();


  db.saveToken(raceId, receivedToken);

  const toSend = {
    id: raceId,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36", 
  };

  console.log('Race started:', toSend);
  res.json(toSend);
});


app.post('/races/:id/laps', (req, res) => {
  const raceId = req.params.id;
  const receivedToken = req.body.token;

  const tokens = db.getTokens(raceId);

  if (tokens.length === 0) {
    return res.status(404).json({ error: 'Race ID not found' });
  }

  
  const tokenToReturn = tokens[tokens.length - 1];


  db.saveToken(raceId, receivedToken);

  const toSend = {
    token: tokenToReturn,
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36", 
  };

  console.log('Lap completed:', toSend);
  res.json(toSend);
});
