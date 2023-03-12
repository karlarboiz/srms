const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let handleData;

async function run(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    handleData = client.db('srmsfinal');

}

function getDb() {
    if(!handleData) {
        throw {message: "Connection failed"}
    }

   return handleData
}

module.exports = {
    runFunc: run,
    getDbFunc: getDb
}