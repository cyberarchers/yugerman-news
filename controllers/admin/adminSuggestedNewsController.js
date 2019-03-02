'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminNewsModel = new (require('../../models/admin/adminNewsModel'));
var adminSuggestedNewsModel = new (require('../../models/admin/adminSuggestedNewsModel'));

class adminSuggestedNewsController {
	edit(req, res) {
		var id = req.body.id;
		var newsID = md5((req.body.title).toLowerCase());
		var urgent = req.body.urgent;
		var title = req.body.title;
		var shortContent = req.body.shortContent;
		var content = req.body.content;
		var previewImage = req.body.previewImage;
		var categories = req.body.categories ? req.body.categories : [];
		var regions = req.body.regions ? req.body.regions : [];
		var date = (new Date()).toLocaleString();

		if(categories.length <= 0 || regions.length <= 0) {
			res.status(200).send({ success: false, categoriesOrRegionsNotSelected: true });
		} else {
			adminNewsModel.findSpecified({
				newsID: newsID
			}).then(news => {
				if(news.length > 0)
					var found = true;
				else
					var found = false;

				if(!found) {
					adminNewsModel.add({
						newsID: newsID,
						urgent: urgent,
						title: title,
						shortContent: req.body.shortContent,
						content: content,
						date: date,
						previewImage: previewImage
					}).then((addNewsSQLResult) => {
						var sqlQueryFinal = '';

						//Каждая выбранная категория ссылается на каждый выбранный регион
						categories.forEach(function(currentCategory, indexCategory, arrayCategory) {
							regions.forEach(function(currentRegion, indexRegion, arrayRegion) {
								sqlQueryFinal += `INSERT INTO filter (news_id, cat_id, region_id) VALUES ('${addNewsSQLResult.insertId}', '${currentCategory}', '${currentRegion}');`;
							});
						});

						adminNewsModel.addToFilter({
							sql: sqlQueryFinal
						}).then(() => {
							adminSuggestedNewsModel.delete({
								id: id
							}).then(() => {
								res.status(200).send({ success: true });
							}).catch(error => {
								res.status(500).send(config.errors.serverError);
							});
						}).catch(error => {
							res.status(500).send(config.errors.serverError);
						});
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
	}

	delete(req, res) {
		var id = req.body.id;

		adminSuggestedNewsModel.findSpecified({
			id: id
		}).then(news => {
			if(news.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminSuggestedNewsModel.delete({
					id: id
				}).then(() => {
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

module.exports = adminSuggestedNewsController;