var co = require('co');
var mongoose = require('mongoose');

// import mongoose from 'mongoose'
// import co from 'co'

let conn = null;

// let uri = `mongodb://${process.env.mdb_username}:${process.env.mdb_password}@${process.env.mongourl}:${process.env.mdb_port}/${process.env.mdb_databaseName}`;

let uri = process.env.MONGO_URI

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.body)

  run(event).
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};

function run(event) {
  return co(function*() {

    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      conn.model('test', new mongoose.Schema({
        action: String,
        lat: Number,
        lng: Number,
        name: String,
        time: String,
        ipaddr: String
      }));
    }

    const M = conn.model('test');
    let bodycopy = JSON.parse(event.body).slice()
    bodycopy.forEach(function(element){
      array[index].ipaddr = event.headers
    })
    M.insertMany()

    const doc = yield M.find();
    const response = {
      // statusCode: 200
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}