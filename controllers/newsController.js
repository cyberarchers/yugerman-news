'use strict';

var config = require('../config');

var newsModel = new (require('../models/newsModel'));

class newsController {
	article(req, res) {
		var id = req.params.id;

		newsModel.getSpecified(id).then(article => {
			res.render('templates/article', {
				article: article
			});
		}).catch(err => {
			res.render('templates/errors/serverError');
		});
	}
}

module.exports = newsController;