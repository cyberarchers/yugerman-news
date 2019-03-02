'use strict';

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminAuthModel {
	/**
	 * Поиск пользователя (любого), по логину и паролю
	 * 
	 * @param  {[type]} login    [description]
	 * @param  {[type]} password [description]
	 * @return {[type]}          [description]
	 */
	findAnyroleSpecified(userID, password) {
		return pool.query(`SELECT * FROM users WHERE user_id = '${userID}' AND password = '${password}' LIMIT 1`);
	}
}

module.exports = adminAuthModel;