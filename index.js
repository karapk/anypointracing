const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const session = require('express-session');
const your_token_value = "secret";
const { v4: uuidv4 } = require('uuid');
const myDb = require('./db');
// console.log(myDb.storedToken.get())
// const myDb = {};

dotenv.config();

const app = express();
// app.use(session({
//   token : your_token_value
// })
// );

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.post('/register', async (req, res) => {
//     const client_id = process.env.CLIENT_ID;
//     // console.log('process.env', process.env)
//     const client_secret = process.env.CLIENT_SECRET;

//     const authString = `${client_id}:${client_secret}`;
//     const base64Auth = Buffer.from(authString).toString('base64');

//     // console.log(req.body)
//     const racerData = {
//         display_name: req.body.display_name,
//         email: req.body.email,
//     };

//     try {
//         const response = await fetch('https://api.anypointspeedway.com/race/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // 'Authorization': `Basic ${base64Auth}`
//             'Username'
//           },
//           body: JSON.stringify(racerData)
//         });

//         console.log(response)
    
//         const data = await response.json();
//         res.json(data);
//       } catch (error) {
//         res.status(500).json({ error: 'Error registering racer' });
//       }
//     });

app.post('/races', (req, res) => {
  const registrationData = {
    displayName: "RoadRunner",
    email: "kpk.my.mailings@gmail.com",
    racerId: "2532c7d5-511b-466a-a8b7-bb6c797efa36",
    clientId: "24a648e789f94db79b650321722ad84a"
}

  console.log(registrationData.racerId )

  // console.log('req.body', req.body)

  const receivedToken = req.body.token;
  // console.log('receivedToken', receivedToken)

  // myDb.storedToken = receivedToken;
  // console.log('myDb', myDb)
  
  myDb.storedToken.add(receivedToken)
  const storedToken =  myDb.storedToken.get();
  console.log('storedToken', storedToken)
 
  const toSend = {
    id: uuidv4(),
    racerId: registrationData.racerId 
  }
res.send(toSend)
})

app.post('/races/:id/laps', (req, res) => {
 console.log(req.params)
 res.status(200).send({ token: req.body.token })
})




// app.get('/hi', async (_req, res) => {
//   console.log({ message: 'Hello World' });
//   res.status(418).send(
//     [{
//     names: ["KK", 'tony']
//   }])
// });

// app.post('/hi/all', (req, res) => {
//  const person = req.body
//  console.log(person)
//  res.send(person)
// })

// app.post('/users', (req, res) => {
//  const person = req.body
//  console.log(person)
//  res.send(person)
// })