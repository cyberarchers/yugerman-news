'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminAuthModel = new (require('../../models/admin/adminAuthModel'));

class adminAuthController {
	login(req, res) {
		var userID = md5((req.body.login).toLowerCase());
		var password = md5(req.body.password);

		adminAuthModel.findAnyroleSpecified(userID, password).then(user => {
			if(user.length > 0) {
				var found = true;
				var role = user[0].role;
				var login = user[0].login;

				req.session.user = {
					login: user[0].login,
					role: user[0].role
				}
			} else {
				var found = false;
				var role = false;
				var login = false;
			}

			res.status(200).send({ found: found, role: role, login: login });
		}).catch(error => {
			res.status(500).send(config.errors.serverError);
		});
	}

	logout(req, res) {
		global.sessionStore.destroy(req.sessionID, function() {
			res.status(200).send({ sessionDestroyed: true });
		});
	}
}

module.exports = adminAuthController;