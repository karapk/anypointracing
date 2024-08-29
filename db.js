const fs = require ('fs');

function writeDb(updatedDb) {
    fs.writeFileSync("./db.json", JSON.stringify(updatedDb, null, 2));
}
  
function readDb() {
    return JSON.parse(fs.readFileSync("./db.json"));
}

module.exports = {
	storedToken: {
		get: () => {
			const dbData = JSON.parse(fs.readFileSync("./db.json"));
			return dbData.token;
		},
		add: (newToken) => {
			const newDb = {
				token: newToken
			}

			writeDb(newDb)
		}
	}
}

const storedToken = {
	name: 'foo',
	releaseKraken: () => {
		console.log('krakenreleased')
	}
}

// const ourData = {
// 	name: 'Foo mc foo',
// 	age: 55,
// 	school: 'playway'
// }

// fs.writeFileSync("./foo.json", JSON.stringify(ourData, null, 2));

//     const foo = JSON.parse(fs.readFileSync("./foo.json"));
// 	console.log(foo.school)

// const theToken = db.token.get()
// console.log(theToken)

