'use strict';

//Экспресс
var express = require('express');

//Роутер
var router = express.Router();

var config = require('../config');

//Маршруты AJAX
router.post('/getNewsFromFilter', (req, res) => {
	var newsModel = new (require('../models/newsModel'));

	var categories = req.body.categories;
	var regions = req.body.regions;

	newsModel.getAllFromFilter(categories, regions)
		.then(news => {
			let newsPerRow = config.newsPerRow;
			let allNews = [];

			for (let i = 0; i < Math.ceil(news.length/newsPerRow); i++){
			    allNews[i] = news.slice((i*newsPerRow), (i*newsPerRow) + newsPerRow);
			}

			setTimeout(function() {
				res.status(200).send(allNews);
			}, 200);
		})
		.catch(error => {
			res.status(500).send(config.errors.serverError);
		});
});

router.post('/addSuggested', (req, res) => {
	var newsModel = new (require('../models/newsModel'));

	var date = (new Date()).toLocaleString();

	newsModel.addSuggested({
		content: req.body.content,
		contactPhone: req.body.contactPhone,
		contactEmail: req.body.contactEmail,
		date: date
	}).then(() => {
		res.status(200).send({ success:true });
	}).catch(error => {
		res.status(500).send(config.errors.serverError);
	});
});

module.exports = router;
