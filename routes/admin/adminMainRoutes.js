'use strict';

//Экспресс
var express = require('express');

//Роутер
var router = express.Router();

var adminController = new (require('../../controllers/admin/adminController'));

var authMiddleware = new (require('../../middlewares/admin/adminAuthMiddleware'));

//Маршруты админ панели
router.get('/index', authMiddleware.anyGuest, (req, res) => {
	adminController.index(req, res);
});

router.get('/dashboard', authMiddleware.anyUser, (req, res) => {
	adminController.dashboard(req, res);
});

router.get('/profile', authMiddleware.anyUser, (req, res) => {
	adminController.profile(req, res);
});

/**
 *
 * Пользователи
 * 
 */

router.get('/users', authMiddleware.anyUser, (req, res) => {
	adminController.users(req, res);
});

router.get('/users/add', authMiddleware.anyUser, (req, res) => {
	adminController.usersAdd(req, res);
});

router.get('/users/edit/:userID', authMiddleware.anyUser, (req, res) => {
	adminController.usersEdit(req, res);
});

router.get('/users/delete/:userID', authMiddleware.anyUser, (req, res) => {
	adminController.usersDelete(req, res);
});

/**
 *
 * Предложенные новости
 * 
 */

router.get('/suggested-news', authMiddleware.anyUser, (req, res) => {
	adminController.suggestedNews(req, res);
});

router.get('/suggested-news/edit/:id', authMiddleware.anyUser, (req, res) => {
	adminController.suggestedNewsEdit(req, res);
});

router.get('/suggested-news/delete/:id', authMiddleware.anyUser, (req, res) => {
	adminController.suggestedNewsDelete(req, res);
});

/**
 *
 * Новости
 * 
 */
router.get('/news', authMiddleware.anyUser, (req, res) => {
	adminController.news(req, res);
});

router.get('/news/add', authMiddleware.anyUser, (req, res) => {
	adminController.newsAdd(req, res);
});

router.get('/news/edit/:newsID', authMiddleware.anyUser, (req, res) => {
	adminController.newsEdit(req, res);
});

router.get('/news/delete/:newsID', authMiddleware.anyUser, (req, res) => {
	adminController.newsDelete(req, res);
});


/**
 *
 * Категории
 * 
 */
router.get('/categories', authMiddleware.anyUser, (req, res) => {
	adminController.categories(req, res);
});

router.get('/categories/add', authMiddleware.anyUser, (req, res) => {
	adminController.categoriesAdd(req, res);
});

router.get('/categories/edit/:categoryID', authMiddleware.anyUser, (req, res) => {
	adminController.categoriesEdit(req, res);
});

router.get('/categories/delete/:categoryID', authMiddleware.anyUser, (req, res) => {
	adminController.categoriesDelete(req, res);
});

/**
 *
 * Регионы
 * 
 */
router.get('/regions', authMiddleware.anyUser, (req, res) => {
	adminController.regions(req, res);
});

router.get('/regions/add', authMiddleware.anyUser, (req, res) => {
	adminController.regionsAdd(req, res);
});

router.get('/regions/edit/:regionID', authMiddleware.anyUser, (req, res) => {
	adminController.regionsEdit(req, res);
});

router.get('/regions/delete/:regionID', authMiddleware.anyUser, (req, res) => {
	adminController.regionsDelete(req, res);
});

/**
 *
 * Статистика
 * 
 */

router.get('/statistics/news', authMiddleware.anyUser, (req, res) => {
	adminController.newsStatistics(req, res);
});

router.get('/statistics/visits', authMiddleware.anyUser, (req, res) => {
	adminController.visitsStatistics(req, res); 
});


module.exports = router;