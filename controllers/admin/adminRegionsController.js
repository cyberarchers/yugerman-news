'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

class adminRegionsController {
	add(req, res) {
		var regionID = md5((req.body.name).toLowerCase());
		var name = req.body.name;

		adminRegionsModel.findSpecified(regionID).then(regions => {
			if(regions.length > 0)
				var found = true;
			else
				var found = false;

			if(!found) {
				adminRegionsModel.add(regionID, name).then(() => {
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
		var regionID = req.body.regionID;
		var updatedRegionID = md5((req.body.name).toLowerCase());
		var name = req.body.name;

		adminRegionsModel.findSpecified(regionID).then(regions => {
			if(regions.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminRegionsModel.findSpecified(updatedRegionID).then((updatedRegions) => {
					if(updatedRegions.length > 0)
						var busyID = true;
					else
						var busyID = false;

					if(!busyID) {
						adminRegionsModel.edit(regionID, updatedRegionID, name).then(() => {
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
		var regionID = req.body.regionID;

		adminRegionsModel.findSpecified(regionID).then(regions => {
			if(regions.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminRegionsModel.delete(regionID).then(() => {
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

module.exports = adminRegionsController;