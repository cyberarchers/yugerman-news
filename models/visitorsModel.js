'use strict';

var mysql = require('promise-mysql');
var config = require('../config');

var pool = mysql.createPool(config.db);

class visitorsModel {
	registerVisit(date, ip) {
		return pool.query(`INSERT INTO visitors (ip, date) VALUES ('${ip}', '${date}')`);
	}
}


module.exports = visitorsModel;