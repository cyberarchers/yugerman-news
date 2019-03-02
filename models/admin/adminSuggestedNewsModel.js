'use strict'; 

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminSuggestedNewsModel {
	delete(data) {
		return pool.query(`DELETE FROM suggested_news WHERE id='${data.id}'`);
	}

	findAny() {
		return pool.query(`SELECT * FROM suggested_news ORDER BY ID DESC`);
	}

	findSpecified(data) {
		return pool.query(`SELECT * FROM suggested_news WHERE id='${data.id}'`);
	}

	findCurrentCategoriesAndRegions(data) {
		return pool.query(`SELECT * FROM filter WHERE news_id='${data.id}'`);
	}
}

module.exports = adminSuggestedNewsModel;