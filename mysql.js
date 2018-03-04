/*************************************
* Name: mysql                        *
* Version: 1.0.0                     *
* Node Module: hapi, mysql           *
* Date:                              *
* By Yoga Cheung                     *
**************************************/

///////////////////////////////////////////////////////////
/* DEFINE */
///////////////////////////////////////////////////////////

var mysql = require('mysql');
var log = console.log.bind(console);

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'sofia',
  password: 'Sofia@12345',
  database: 'project'
});

exports.query = pool.query.bind(pool);

///////////////////////////////////////////////////////////
/* Parking */
///////////////////////////////////////////////////////////

exports.getAllLots = function(callback) {
  var stmt = "SELECT car_park_id, park_id, lot_id, status FROM car_park;";
  pool.query(stmt, function(err, result){
    if(err) callback(err, null);
    else callback(null, result);
  });
}

exports.getAvaliable = function(callback) {
  var stmt = "SELECT park_id, COUNT(car_park_id) AS Total FROM car_park WHERE status = 0 GROUP BY park_id;";
  pool.query(stmt, function(err, result){
    if(err) callback(err, null);
    else callback(null, result);
  });
}

exports.updateLotStatus = function(car_park_id, callback) {
  var stmt = "UPDATE car_park SET status = NOT(status) WHERE car_park_id = ?;";
  pool.query(stmt, car_park_id, function(err, result){
    if(err) callback(err, null);
    else callback(null, result);
  });
}

//------------------------ END --------------------------//