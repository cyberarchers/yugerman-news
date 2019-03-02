'use strict';

var mysql = require('promise-mysql');
var config = require('../../config');

var pool = mysql.createPool(config.db);

class adminRegionsModel {
	add(regionID, name) {
		return pool.query(`INSERT INTO regions (region_id, name) VALUES ('${regionID}', '${name}')`);
	}

	edit(regionID, updatedRegionID, name) {
		return pool.query(`UPDATE regions SET region_id='${updatedRegionID}', name='${name}' WHERE region_id='${regionID}'`);
	}

	delete(regionID) {
		return pool.query(`DELETE FROM regions WHERE region_id='${regionID}'`);
	}

	findAny() {
		return pool.query(`SELECT * FROM regions ORDER BY ID DESC`);
	}

	findSpecified(regionID) {
		return pool.query(`SELECT * FROM regions WHERE region_id='${regionID}'`);
	}
}

module.exports = adminRegionsModel;