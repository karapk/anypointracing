app.post('/races/:id/laps', (req, res) => {
  const raceId = req.params.id;
  const receivedToken = req.body.token;

  console.log(`Received raceId: ${raceId}`);
  console.log(`Received token: ${receivedToken}`);

  const tokens = db.getTokens(raceId);

  if (!tokens || tokens.length === 0) {
    console.log(`Race ID not found in the database: ${raceId}`);
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
