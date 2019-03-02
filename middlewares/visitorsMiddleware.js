'use strict';

var config = require('../config');

var visitorsModel = new (require('../models/visitorsModel'));

class visitorsMiddleware {
	registerVisit(req, res, next) {
		var date = (new Date()).toLocaleString();
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		visitorsModel.registerVisit(date, ip).then(() => {
			next();
		}).catch(error => {
			console.error(error);
			next();
		});
	}
}

module.exports = visitorsMiddleware;