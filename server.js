/*************************************
* Name: server.js                    *
* Version: 1.0.0                     *
* Node Module: hapi, mysql           *
* Date:                              *
* By Yoga Cheung                     *
**************************************/

///////////////////////////////////////////////////////////
/* DEFINE */
///////////////////////////////////////////////////////////

var Hapi = require('hapi');
var db = require('./mysql.js');
var log = console.log.bind(console);

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});


///////////////////////////////////////////////////////////
/* Parking */
///////////////////////////////////////////////////////////

// Update
server.route({
  method: 'GET',
  path: '/updatelotstatus/{car_park_id}',
  handler: function (request, reply){
    var car_park_id = request.params.car_park_id;
    db.updateLotStatus(car_park_id, function(err, result){
      if(err == null) reply({"msg":'Success'});   
      else reply(err);
    });
  }
});

// Get
server.route({
  method: 'GET',
  path: '/getalllots',
  handler: function (request, reply) {
    db.getAllLots(function(err, result){
      if(err == null) reply(result);
      else reply(err);
    });
  }
});

// Get Total Avaliable
server.route({
  method: 'GET',
  path: '/getavaliable',
  handler: function (request, reply) {	
    db.getAvaliable(function(err, result){
      if(err == null) reply(result);
      else reply(err);
    });
  }
});

//------------------------ END --------------------------//