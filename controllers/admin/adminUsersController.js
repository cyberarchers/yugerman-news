'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminUsersModel = new (require('../../models/admin/adminUsersModel'));

class adminUsersController {
	add(req, res) {
		var userID = md5((req.body.login).toLowerCase());
		var role = req.body.role;
		var login = req.body.login;
		var password = md5(req.body.password);

		adminUsersModel.findSpecified(userID).then(users => {
			if(users.length > 0)
				var found = true;
			else
				var found = false;

			if(!found) {
				adminUsersModel.add(userID, role, login, password).then(() => {
					res.status(200).send({ success: true });
				}).catch(error => {
					console.log(error);
					res.status(500).send(config.errors.serverError);
				});
			} else {
				res.status(200).send({ success: false, alreadyExists: true });
			}
		}).catch(error => {
			console.log(error);
			res.status(500).send(config.errors.serverError);
		});
	}

	edit(req, res) {
		var userID = req.body.userID;
		var role = req.body.role;
		var password = md5(req.body.password);

		adminUsersModel.findSpecified(userID).then(users => {
			if(users.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminUsersModel.edit(userID, role, password).then(() => {
					res.status(200).send({ success: true });
				}).catch(error => {
					res.status(500).send(config.errors.serverError);
				});
			} else {
				res.status(200).send({ success: false });
			}
		}).catch(error => {
			res.status(500).send(config.errors.serverError);
		});
	}

	delete(req, res) {
		var userID = req.body.userID;

		adminUsersModel.findSpecified(userID).then(users => {
			if(users.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminUsersModel.delete(userID).then(() => {
					res.status(200).send({ success: true });
				}).catch(error => {
					res.status(500).send(config.errors.serverError);
				});
			} else {
				res.status(200).send({ success: false });
			}
		}).catch(error => {
			res.status(500).send(config.errors.serverError);
		});
	}
}

module.exports = adminUsersController;