'use strict';

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminUsersModel {
	add(userID, role, login, password) {
		return pool.query(`INSERT INTO users (user_id, role, login, password) VALUES ('${userID}', '${role}', '${login}', '${password}')`);
	}

	edit(userID, role, password) {
		return pool.query(`UPDATE users SET role='${role}', password='${password}' WHERE user_id='${userID}'`);
	}

	delete(userID) {
		return pool.query(`DELETE FROM users WHERE user_id='${userID}'`);
	}

	findAny() {
		return pool.query(`SELECT * FROM users ORDER BY ID DESC`);
	}

	findSpecified(userID) {
		return pool.query(`SELECT * FROM users WHERE user_id='${userID}'`);
	}

	findSpecifiedByRole(userID, role) {
		return pool.query(`SELECT * FROM users WHERE user_id='${userID}' AND role='${role}'`);
	}
}

module.exports = adminUsersModel;