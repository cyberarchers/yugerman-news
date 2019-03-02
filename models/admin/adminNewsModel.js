'use strict'; 

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminNewsModel {
	add(data) {
		return pool.query(`INSERT INTO news (news_id, urgent, title, author, content, short_content, preview_image, date) VALUES ('${data.newsID}', '${data.urgent}', '${data.title}', '${data.author}', '${data.content}', '${data.shortContent}', '${data.previewImage}', '${data.date}')`);
	}

	addToFilter(data) {
		return pool.query(data.sql);
	}

	edit(data) {
		return pool.query(`UPDATE news SET news_id='${data.newsID}', urgent='${data.urgent}', title='${data.title}', content='${data.content}', short_content='${data.shortContent}', preview_image='${data.previewImage}' WHERE id='${data.id}'`);
	}

	delete(data) {
		return pool.query(`DELETE FROM news WHERE id='${data.id}'`);
	}

	findAny() {
		return pool.query(`SELECT * FROM news ORDER BY ID DESC`);
	}

	findSpecified(data) {
		return pool.query(`SELECT * FROM news WHERE news_id='${data.newsID}'`);
	}

	findCurrentCategoriesAndRegions(data) {
		return pool.query(`SELECT * FROM filter WHERE news_id='${data.id}'`);
	}

	deleteCurrentCategoriesAndRegions(data) {
		return pool.query(`DELETE FROM filter WHERE news_id='${data.id}'`);
	}
}

module.exports = adminNewsModel;