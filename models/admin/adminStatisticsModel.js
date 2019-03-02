'use strict';

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminStatisticsModel {
	findAnyVisitors() {
		return pool.query(`SELECT * FROM visitors`);
	}

	findAnyNews() {
		return pool.query(`SELECT * FROM news`);
	}
}

module.exports = adminStatisticsModel;