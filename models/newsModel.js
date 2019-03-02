'use strict';

var mysql = require('promise-mysql');
var config = require('../config');

var pool = mysql.createPool(config.db);

class newsModel {
	//Все новости
	getAll() {
		return pool.query(`SELECT * FROM news ORDER BY id DESC LIMIT 9`);
	}

	getUrgent() {
		return pool.query(`SELECT * FROM news WHERE urgent='1' ORDER BY id DESC LIMIT 5`);
	}

	//Все новости, учитывая фильтр
	getAllFromFilter(categories, regions) {
		var categoriesString = Array.isArray(categories) ? "'" + categories.join("','") + "'" : false;
		var regionsString = Array.isArray(regions) ? "'" + regions.join("','") + "'" : false;

		var SQLQuery = null;

		if(categoriesString && regionsString) {
			SQLQuery = `SELECT DISTINCT news.* FROM news INNER JOIN filter ON news.id = filter.news_id WHERE filter.cat_id IN (${categoriesString}) AND filter.region_id IN (${regionsString}) ORDER BY id DESC LIMIT 9`;
		} else if(categoriesString) {
			SQLQuery = `SELECT DISTINCT news.* FROM news INNER JOIN filter ON news.id = filter.news_id WHERE filter.cat_id IN (${categoriesString}) ORDER BY id DESC LIMIT 9`;
		} else if(regionsString) {
			SQLQuery = `SELECT DISTINCT news.* FROM news INNER JOIN filter ON news.id = filter.news_id WHERE filter.region_id IN (${regionsString}) ORDER BY id DESC LIMIT 9`;
		} else {
			SQLQuery = `SELECT * FROM news ORDER BY id DESC LIMIT 9`;
		}

		return pool.query(SQLQuery);
	}

	getSpecified(id) {
		return pool.query(`SELECT * FROM news WHERE id='${id}'`);
	}

	addSuggested(data) {
		return pool.query(`INSERT INTO suggested_news (content, contact_phone, contact_email, date) VALUES ('${data.content}', '${data.contactPhone}', '${data.contactEmail}', '${data.date}')`);
	}
}

module.exports = newsModel;
