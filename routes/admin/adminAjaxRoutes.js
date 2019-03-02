'use strict';

//Экспресс
var express = require('express');

//Роутер
var router = express.Router();

var adminAuthController = new (require('../../controllers/admin/adminAuthController'));

/**
 *
 * Аутентификация
 * 
 */

router.post('/auth/login', (req, res) => {
	adminAuthController.login(req, res);
});

router.post('/auth/logout', (req, res) => {
	adminAuthController.logout(req, res);
});

/**
 *
 * Новости
 * 
 */
router.post('/suggestedNews/edit', (req, res) => {
	var adminSuggestedNewsController = new (require('../../controllers/admin/adminSuggestedNewsController'));

	adminSuggestedNewsController.edit(req, res);
});

router.post('/suggestedNews/delete', (req, res) => {
	var adminSuggestedNewsController = new (require('../../controllers/admin/adminSuggestedNewsController'));

	adminSuggestedNewsController.delete(req, res);
});

/**
 *
 * Новости
 * 
 */

router.post('/news/add', (req, res) => {
	var adminNewsController = new (require('../../controllers/admin/adminNewsController'));

	adminNewsController.add(req, res);
});

router.post('/news/edit', (req, res) => {
	var adminNewsController = new (require('../../controllers/admin/adminNewsController'));

	adminNewsController.edit(req, res);
});

router.post('/news/delete', (req, res) => {
	var adminNewsController = new (require('../../controllers/admin/adminNewsController'));

	adminNewsController.delete(req, res);
});

/**
 *
 * Категории
 * 
 */

router.post('/categories/add', (req, res) => {
	var adminCategoriesController = new (require('../../controllers/admin/adminCategoriesController'));

	adminCategoriesController.add(req, res);
});

router.post('/categories/edit', (req, res) => {
	var adminCategoriesController = new (require('../../controllers/admin/adminCategoriesController'));

	adminCategoriesController.edit(req, res);
});

router.post('/categories/delete', (req, res) => {
	var adminCategoriesController = new (require('../../controllers/admin/adminCategoriesController'));

	adminCategoriesController.delete(req, res);
});

/**
 *
 * Регионы
 * 
 */

router.post('/regions/add', (req, res) => {
	var adminRegionsController = new (require('../../controllers/admin/adminRegionsController'));

	adminRegionsController.add(req, res);
});

router.post('/regions/edit', (req, res) => {
	var adminRegionsController = new (require('../../controllers/admin/adminRegionsController'));

	adminRegionsController.edit(req, res);
});

router.post('/regions/delete', (req, res) => {
	var adminRegionsController = new (require('../../controllers/admin/adminRegionsController'));

	adminRegionsController.delete(req, res);
});

/**
 *
 * Пользователи
 * 
 */

router.post('/users/add', (req, res) => {
	var adminUsersController = new (require('../../controllers/admin/adminUsersController'));

	adminUsersController.add(req, res);
});

router.post('/users/edit', (req, res) => {
	var adminUsersController = new (require('../../controllers/admin/adminUsersController'));

	adminUsersController.edit(req, res);
});

router.post('/users/delete', (req, res) => {
	var adminUsersController = new (require('../../controllers/admin/adminUsersController'));

	adminUsersController.delete(req, res);
});

module.exports = router;