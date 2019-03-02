'use strict';

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminCategoriesModel {
	add(catID, name) {
		return pool.query(`INSERT INTO categories (cat_id, name) VALUES ('${catID}', '${name}')`);
	}

	edit(catID, updatedCatID, name) {
		return pool.query(`UPDATE categories SET cat_id='${updatedCatID}', name='${name}' WHERE cat_id='${catID}'`);
	}

	delete(catID) {
		return pool.query(`DELETE FROM categories WHERE cat_id='${catID}'`);
	}

	findAny() {
		return pool.query(`SELECT * FROM categories ORDER BY ID DESC`);
	}

	findSpecified(catID) {
		return pool.query(`SELECT * FROM categories WHERE cat_id='${catID}'`);
	}
}

module.exports = adminCategoriesModel;