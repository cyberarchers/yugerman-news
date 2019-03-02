'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));

class adminCategoriesController {
	add(req, res) {
		var categoryID = md5((req.body.name).toLowerCase());
		var name = req.body.name;

		adminCategoriesModel.findSpecified(categoryID).then(categories => {
			if(categories.length > 0)
				var found = true;
			else
				var found = false;

			if(!found) {
				adminCategoriesModel.add(categoryID, name).then(() => {
					res.status(200).send({ success: true });
				}).catch(error => {
					res.status(500).send(config.errors.serverError);
				});
			} else {
				res.status(200).send({ success: false, alreadyExists: true });
			}
		}).catch(error => {
			res.status(500).send(config.errors.serverError);
		});
	}

	edit(req, res) {
		var categoryID = req.body.categoryID;
		var updatedCategoryID = md5((req.body.name).toLowerCase());
		var name = req.body.name;

		adminCategoriesModel.findSpecified(categoryID).then(categories => {
			if(categories.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminCategoriesModel.findSpecified(updatedCategoryID).then((updatedCategories) => {
					if(updatedCategories.length > 0)
						var busyID = true;
					else
						var busyID = false;

					if(!busyID) {
						adminCategoriesModel.edit(categoryID, updatedCategoryID, name).then(() => {
							res.status(200).send({ success: true });
						}).catch(error => {
							res.status(500).send(config.errors.serverError);
						});
					} else {
						res.status(200).send({ success: false, busyID: busyID });
					}
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
		var categoryID = req.body.categoryID;

		adminCategoriesModel.findSpecified(categoryID).then(categories => {
			if(categories.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminCategoriesModel.delete(categoryID).then(() => {
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

module.exports = adminCategoriesController;