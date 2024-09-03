const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');


function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the database:', error);
    return {};
  }
}


function writeDb(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to the database:', error);
  }
}


function getTokens(raceId) {
  const db = readDb();
  return db[raceId] || [];
}

function saveToken(raceId, token) {
  const db = readDb();
  if (!db[raceId]) {
    db[raceId] = [];
  }
  db[raceId].push(token);
  writeDb(db);
}

module.exports = {
  getTokens,
  saveToken,
};
