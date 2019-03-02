'use strict';

//Экспресс
var express = require('express');

//Роутер
var router = express.Router();

var homeController = new (require('../controllers/homeController'));

const visitorsMiddleware = new (require('../middlewares/visitorsMiddleware'));

//Маршруты главной страницы
router.get('/', visitorsMiddleware.registerVisit, (req, res) => {
	homeController.index(req, res);
});

router.get('/about', visitorsMiddleware.registerVisit, (req, res) => {
	res.render('templates/static/about');
});

router.get('/contacts', visitorsMiddleware.registerVisit, (req, res) => {
	res.render('templates/static/contacts');
});

router.get('/job', visitorsMiddleware.registerVisit, (req, res) => {
	res.render('templates/static/job');
});

router.get('/addSuggested', visitorsMiddleware.registerVisit, (req, res) => {
	res.render('templates/static/addSuggested');
});

router.get('/article/:id', visitorsMiddleware.registerVisit, (req, res) => {
	var newsController = new (require('../controllers/newsController'));

	newsController.article(req, res);
});

module.exports = router;