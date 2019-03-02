'use strict';

var config = require('../config');

var newsModel = new (require('../models/newsModel'));
var filterModel = new (require('../models/filterModel'));

class homeController {
	index(req, res) {
		//Получаем все новости
		newsModel.getAll().then(news => {
			let newsPerRow = config.newsPerRow;
			let allNews = [];

			for (let i = 0; i < Math.ceil(news.length/newsPerRow); i++){
			    allNews[i] = news.slice((i*newsPerRow), (i*newsPerRow) + newsPerRow);
			}

			//Получаем срочные новости
			newsModel.getUrgent().then(urgentNews => {
				//Получаем все категории
				filterModel.getAllCategories().then(categories => {
					//Получаем все регионы
					filterModel.getAllRegions().then(regions => {
						//Рендерим шаблон
						res.render('templates/index', {
							allNews: allNews,
							urgentNews: urgentNews,
							allCategories: categories,
							allRegions: regions
						});
					}).catch(err => {
						res.render('templates/errors/serverError');
					});
				}).catch(err => {
					res.render('templates/errors/serverError');
				});
			}).catch(err => {
				res.render('templates/errors/serverError');
			})
		}).catch(err => {
			res.render('templates/errors/serverError');
		});
	}
}

module.exports = homeController;
