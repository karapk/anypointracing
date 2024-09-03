const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(express.json());


const myDb = {
  races: new Map(),
};


app.post('/races', (req, res) => {
  const receivedToken = req.body.token; 
  const raceId = uuidv4(); 

  
  myDb.races.set(raceId, [receivedToken]);

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


  if (!myDb.races.has(raceId)) {
    return res.status(404).json({ error: 'Race ID not found' });
  }

  const tokens = myDb.races.get(raceId);


  const tokenToReturn = tokens[tokens.length - 1]; 

 
  tokens.push(receivedToken); 
  myDb.races.set(raceId, tokens); 

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
