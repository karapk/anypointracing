// db.js
const races = new Map(); 


function saveToken(raceId, token) {
  if (!races.has(raceId)) {
    races.set(raceId, []);
  }
  races.get(raceId).push(token);
}

// Retrieve tokens for a specific race ID
function getTokens(raceId) {
  return races.get(raceId) || [];
}

module.exports = { saveToken, getTokens };
