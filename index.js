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

// Endpoint to start a race
app.post('/races', (req, res) => {
  const receivedToken = req.body.token;
  const raceId = uuidv4();


  db.saveToken(raceId, receivedToken);

  const toSend = {
    id: raceId,
    racerId: "e38d46e2-6f32-4e4b-b64b-131cb7ffe0be", 
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
    racerId: "e38d46e2-6f32-4e4b-b64b-131cb7ffe0be", 
  };

  console.log('Lap completed:', toSend);
  res.json(toSend);
});
