const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
    const client_id = 'a293b69a340a43f1937a7f68ec5b09fc';
    const client_secret = 'E2D21977fFEC417bAA559CA1439De80D';

    const authString = `${client_id}:${client_secret}`;
    const base64Auth = Buffer.from(authString).toString('base64');

    const racerData = {
        display_name: req.body.display_name,
        email: req.body.email,
    };

    try {
        const response = await fetch('https://api.anypointspeedway.com/race/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
          },
          body: JSON.stringify(racerData)
        });
    
        const data = await response.json();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Error registering racer' });
      }
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
