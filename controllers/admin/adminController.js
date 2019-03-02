'use strict';

var config = require('../../config');

class adminController {
	index(req, res) {
		res.render('templates/admin/index');
	}

	dashboard(req, res) {
		//const disk = require('diskusage');
		const os = require('os');
		const si = require('systeminformation');

		//Определение типа системы, необходимо для модуля дискового пространства
		var path = os.platform() === 'win32' ? 'c:' : '/';

		//Получаем информацию о диске
		//var diskInfo = disk.checkSync(path);

		//Объект с информацией о диске
		var diskSpace = {
			total: 0,
			free: 0,
			total: 0
		};

		//Аптайм сервера
		var uptime = si.time().uptime;

		//Получаем информацию о системе
		si.osInfo().then(siOsInfo => {
			var osInfo = {
				platform: siOsInfo.platform,
				arch: siOsInfo.arch
			};

			//Получаем информацию о текущей загрузке процессора
			si.currentLoad().then(siCurrentLoad => {
				var currentLoad = {
					cpu: siCurrentLoad.currentload.toFixed()
				};

				//Получаем информацию о оперативной памяти
				si.mem().then(siMemory => {
					var memory = {
						total: ((siMemory.total / 1024) / 1024).toFixed(),
						free: ((siMemory.free / 1024) / 1024).toFixed()
					};

					res.render('templates/admin/dashboard', { 
						serverInfo: {
							currentLoad: currentLoad,
							memory: memory,
							uptime: uptime,
							os: osInfo,
							diskSpace: diskSpace
						}
					});
				}).catch(error => {
					console.error(error);
				});
			}).catch(error => {
				console.error(error);
			});
		}).catch(error => {
			console.error(error);
		});
	}

	profile(req, res) {
		var user = req.session.user;

		res.render('templates/admin/profile', { user: user });
	}

	/**
	 *
	 * Пользователи
	 * 
	 */

	users(req, res) {
		var adminUsersModel = new (require('../../models/admin/adminUsersModel'));

		adminUsersModel.findAny().then(users => {
			res.render('templates/admin/users', { users: users });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	usersAdd(req, res) {
		res.render('templates/admin/usersAdd');
	}

	usersEdit(req, res) {
		var adminUsersModel = new (require('../../models/admin/adminUsersModel'));

		var userID = req.params.userID;

		adminUsersModel.findSpecified(userID).then(user => {
			if(user.length > 0)
				var found = true;
			else
				var found = false;

			res.render('templates/admin/usersEdit', { user: user, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	usersDelete(req, res) {
		var adminUsersModel = new (require('../../models/admin/adminUsersModel'));

		var userID = req.params.userID;

		adminUsersModel.findSpecified(userID).then(user => {
			if(user.length > 0)
				var found = true;
			else
				var found = false;
			
			res.render('templates/admin/usersDelete', { user: user, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	/**
	 *
	 * Предложенные новости
	 * 
	 */

	suggestedNews(req, res) {
		var adminSuggestedNewsModel = new (require('../../models/admin/adminSuggestedNewsModel'));

		adminSuggestedNewsModel.findAny().then(news => {
			res.render('templates/admin/suggestedNews', { news: news });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	suggestedNewsEdit(req, res) {
		var adminSuggestedNewsModel = new (require('../../models/admin/adminSuggestedNewsModel'));
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		var id = req.params.id;

		adminSuggestedNewsModel.findSpecified({
			id: id
		}).then(article => {
			if(article.length > 0) {
				var found = true;
				var id = article[0].id;
			} else {
				var found = false;
				var id = 0;
			}

			adminCategoriesModel.findAny().then(categories => {
				adminRegionsModel.findAny().then(regions => {
					adminSuggestedNewsModel.findCurrentCategoriesAndRegions({
						id: id
					}).then(categoriesAndRegions => {
						var currentCategories = [];
						var currentRegions = [];

						categoriesAndRegions.forEach(function(current, index, array) {
							currentCategories.push(parseInt(current.cat_id));
							currentRegions.push(parseInt(current.region_id));
						});

						res.render('templates/admin/suggestedNewsEdit', {
							categories: categories,
							regions: regions,
							article: article, 
							found: found,
							categoriesAndRegions: categoriesAndRegions,
							currentCategories: currentCategories,
							currentRegions: currentRegions
						});
					}).catch(err => {
						res.render('templates/errors/serverError');
					});
				}).catch(err => {
					res.render('templates/errors/serverError');
				});
			}).catch(err => {
				res.render('templates/errors/serverError');
			});
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	suggestedNewsDelete(req, res) {
		var adminSuggestedNewsModel = new (require('../../models/admin/adminSuggestedNewsModel'));

		var id = req.params.id;

		adminSuggestedNewsModel.findSpecified({
			id: id
		}).then(article => {
			if(article.length > 0)
				var found = true;
			else
				var found = false;

			res.render('templates/admin/suggestedNewsDelete', { article: article, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	/**
	 *
	 * Новости
	 * 
	 */
	
	news(req, res) {
		var adminNewsModel = new (require('../../models/admin/adminNewsModel'));

		adminNewsModel.findAny().then(news => {
			res.render('templates/admin/news', { news: news });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	newsAdd(req, res) {
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		adminCategoriesModel.findAny().then(categories => {
			adminRegionsModel.findAny().then(regions => {
				res.render('templates/admin/newsAdd', {
					categories: categories,
					regions: regions
				});
			}).catch(err => {
				res.render('templates/errors/serverError');
			});
		}).catch(err => {
			res.render('templates/errors/serverError');
		});
	}

	newsEdit(req, res) {
		var adminNewsModel = new (require('../../models/admin/adminNewsModel'));
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		var newsID = req.params.newsID;

		adminNewsModel.findSpecified({
			newsID: newsID
		}).then(article => {
			if(article.length > 0) {
				var found = true;
				var id = article[0].id;
			} else {
				var found = false;
				var id = 0;
			}

			adminCategoriesModel.findAny().then(categories => {
				adminRegionsModel.findAny().then(regions => {
					adminNewsModel.findCurrentCategoriesAndRegions({
						id: id
					}).then(categoriesAndRegions => {
						var currentCategories = [];
						var currentRegions = [];

						categoriesAndRegions.forEach(function(current, index, array) {
							currentCategories.push(parseInt(current.cat_id));
							currentRegions.push(parseInt(current.region_id));
						});

						res.render('templates/admin/newsEdit', {
							categories: categories,
							regions: regions,
							article: article, 
							found: found,
							categoriesAndRegions: categoriesAndRegions,
							currentCategories: currentCategories,
							currentRegions: currentRegions
						});
					}).catch(err => {
						res.render('templates/errors/serverError');
					});
				}).catch(err => {
					res.render('templates/errors/serverError');
				});
			}).catch(err => {
				res.render('templates/errors/serverError');
			});
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	newsDelete(req, res) {
		var adminNewsModel = new (require('../../models/admin/adminNewsModel'));

		var newsID = req.params.newsID;

		adminNewsModel.findSpecified({
			newsID: newsID
		}).then(article => {
			if(article.length > 0)
				var found = true;
			else
				var found = false;

			res.render('templates/admin/newsDelete', { article: article, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	/**
	 *
	 * Категории
	 * 
	 */
	
	categories(req, res) {
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));

		adminCategoriesModel.findAny().then(categories => {
			res.render('templates/admin/categories', { categories: categories });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	categoriesAdd(req, res) {
		res.render('templates/admin/categoriesAdd');
	}

	categoriesEdit(req, res) {
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));

		var categoryID = req.params.categoryID;

		adminCategoriesModel.findSpecified(categoryID).then(category => {
			if(category.length > 0)
				var found = true;
			else
				var found = false;

			res.render('templates/admin/categoriesEdit', { category: category, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	categoriesDelete(req, res) {
		var adminCategoriesModel = new (require('../../models/admin/adminCategoriesModel'));

		var categoryID = req.params.categoryID;

		adminCategoriesModel.findSpecified(categoryID).then(category => {
			if(category.length > 0)
				var found = true;
			else
				var found = false;
			
			res.render('templates/admin/categoriesDelete', { category: category, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	/**
	 *
	 * Регионы
	 * 
	 */
	
	regions(req, res) {
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		adminRegionsModel.findAny().then(regions => {
			res.render('templates/admin/regions', { regions: regions });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	regionsAdd(req, res) {
		res.render('templates/admin/regionsAdd');
	}

	regionsEdit(req, res) {
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		var regionID = req.params.regionID;

		adminRegionsModel.findSpecified(regionID).then(region => {
			if(region.length > 0)
				var found = true;
			else
				var found = false; 

			res.render('templates/admin/regionsEdit', { region: region, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	regionsDelete(req, res) {
		var adminRegionsModel = new (require('../../models/admin/adminRegionsModel'));

		var regionID = req.params.regionID;

		adminRegionsModel.findSpecified(regionID).then(region => {
			if(region.length > 0)
				var found = true;
			else
				var found = false;

			res.render('templates/admin/regionsDelete', { region: region, found: found });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	/**
	 *
	 * Статистика
	 * 
	 */
	
	newsStatistics(req, res) {
		var adminStatisticsModel = new (require('../../models/admin/adminStatisticsModel'));

		adminStatisticsModel.findAnyNews().then(newsCount => {
			res.render('templates/admin/newsStatistics', { newsCount: newsCount.length });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}

	visitsStatistics(req, res) {
		var adminStatisticsModel = new (require('../../models/admin/adminStatisticsModel'));

		adminStatisticsModel.findAnyVisitors().then(visitorsCount => {
			res.render('templates/admin/visitsStatistics', { visitorsCount: visitorsCount.length });
		}).catch(error => {
			res.render('templates/errors/serverError');
		});
	}
}

module.exports = adminController;