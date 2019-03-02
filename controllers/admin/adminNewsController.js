'use strict';

var md5 = require('md5');

var config = require('../../config');

var adminNewsModel = new (require('../../models/admin/adminNewsModel'));

class adminNewsController {
	add(req, res) {
		var newsID = md5((req.body.title).toLowerCase());
		var urgent = req.body.urgent;
		var title = req.body.title;
		var author = req.session.user.login;
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
						author: author,
						shortContent: shortContent,
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
							res.status(200).send({ success: true });
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

	edit(req, res) {
		var id = req.body.id;
		var oldNewsID = req.body.newsID;
		var newsID = md5((req.body.title).toLowerCase());
		var urgent = req.body.urgent;
		var title = req.body.title;
		var shortContent = req.body.shortContent;
		var content = req.body.content;
		var previewImage = req.body.previewImage;
		var categories = req.body.categories ? req.body.categories : [];
		var regions = req.body.regions ? req.body.regions : [];

		console.log(categories);
		console.log(regions);

		if(categories.length <= 0 || regions.length <= 0) {
			res.status(200).send({ success: false, categoriesOrRegionsNotSelected: true });
		} else {
			adminNewsModel.findSpecified({
				newsID: oldNewsID
			}).then(news => {
				if(news.length > 0)
					var found = true;
				else
					var found = false;

				if(found) {
					adminNewsModel.edit({
						id: id,
						newsID: newsID,
						urgent: urgent,
						title: title,
						shortContent: shortContent,
						content: content,
						previewImage: previewImage
					}).then(() => {
						adminNewsModel.deleteCurrentCategoriesAndRegions({
							id: id
						}).then(() => {
							var sqlQueryFinal = '';

							//Каждая выбранная категория ссылается на каждый выбранный регион
							categories.forEach(function(currentCategory, indexCategory, arrayCategory) {
								regions.forEach(function(currentRegion, indexRegion, arrayRegion) {
									sqlQueryFinal += `INSERT INTO filter (news_id, cat_id, region_id) VALUES ('${id}', '${currentCategory}', '${currentRegion}');`;
								});
							});

							adminNewsModel.addToFilter({
								sql: sqlQueryFinal
							}).then(() => {
								res.status(200).send({ success: true });
							}).catch(error => {
								res.status(500).send(config.errors.serverError);
							});
						}).catch(error => {
							res.status(500).send(config.errors.serverError);
						})
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

	delete(req, res) {
		var newsID = req.body.newsID;
		var id = req.body.id;

		adminNewsModel.findSpecified({
			newsID: newsID
		}).then(news => {
			if(news.length > 0)
				var found = true;
			else
				var found = false;

			if(found) {
				adminNewsModel.delete({
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

module.exports = adminNewsController;