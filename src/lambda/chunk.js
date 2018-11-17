var co = require('co');
var mongoose = require('mongoose');

let conn = null;

let uri = process.env.MONGO_URI

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod === 'POST') {
    runPost(event).
      then(res => {
        callback(null, res);
      }).
      catch(error => callback(error));
  } else {
    runGet(event).
      then(res => {
        callback(null, res);
      }).
      catch(error => callback(error));
  }

};

function runPost(event) {
  console.log(event)
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
    bodycopy.forEach(function(value, index, array){
      array[index].ipaddr = event.headers['client-ip']
    })
    M.insertMany(bodycopy)

    const response = {
      statusCode: 200
    };
    return response;
  });
}

function runGet(event) {
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

    const M = conn.model('test')

    const doc = yield M.find({},
      { _id: 0, ipaddr: 0, time: 0, __v: 0 })
    var ret = []
    for (var i = 0, len = doc.length; i < len; i++) {
      if (i % 3 === 0 ) {
        ret.push(doc[i]);
      }
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(ret)
    };
    return response
  });
}