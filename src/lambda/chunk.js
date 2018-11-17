var co = require('co');
var mongoose = require('mongoose');

// import mongoose from 'mongoose'
// import co from 'co'

let conn = null;

const uri = `mongodb://${process.env.mdb_username}:${process.env.mdb_password}@${process.env.mongourl}:${process.env.mdb_port}/${process.env.mdb_databaseName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
exports.handler = function(event, context, callback) {

  console.log(uri);
  context.callbackWaitsForEmptyEventLoop = false;

  run().
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};

function run() {
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
        // schedule: String,
        // occupancy: Number,
        // count: Number,
        // price: Number,
        // time: String,
        // link: String
      }));
    }

    const M = conn.model('test');

    M.insertMany([
      {
        action: 'H',
        lat: 123,
        lng: 321,
        name: 'String',
        time: '2345678',
        ipaddr: '12.12.12.12'
      },
      {
        action: 'H',
        lat: 123,
        lng: 321,
        name: 'String',
        time: '2345678',
        ipaddr: '12.12.12.12'
      },
      {
        action: 'H',
        lat: 123,
        lng: 321,
        name: 'String',
        time: '2345678',
        ipaddr: '12.12.12.12'
      },
      {
        action: 'H',
        lat: 123,
        lng: 321,
        name: 'String',
        time: '2345678',
        ipaddr: '12.12.12.12'
      },
      {
        action: 'H',
        lat: 123,
        lng: 321,
        name: 'String',
        time: '2345678',
        ipaddr: '12.12.12.12'
      }
    ])

    const doc = yield M.find();
    const response = {
      // statusCode: 200
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}