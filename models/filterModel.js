'use strict';

var mysql = require('promise-mysql');
var config = require('../config');

var pool = mysql.createPool(config.db);

class filterModel {
	//Все категории
	getAllCategories() {
		return pool.query(`SELECT * FROM categories`);
	}

	//Все регионы
	getAllRegions() {
		return pool.query(`SELECT * FROM regions`);
	}
}

module.exports = filterModel;