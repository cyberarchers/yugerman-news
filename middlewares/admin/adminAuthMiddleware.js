'use strict';

var config = require('../../config');

class adminAuthMiddleware {
	anyGuest(req, res, next) {
		if(req.session.user) {
			res.redirect('/admin-panel/dashboard');
		} else {
			next();
		}
	}

	anyUser(req, res, next) {
		if(req.session.user) {
			res.locals.userRole = req.session.user.role;
			next();
		} else {
			res.redirect('/admin-panel/index');
		}
	}
}

module.exports = adminAuthMiddleware;