'use strict';

var config = {
	//production | dev
	mode: 'production',
	online: true,

	siteTitle: 'R21 / Новости',
	siteAdminPanelTitle: 'Админ панель',

	newsPerRow: 3,

	errors: {
		serverError: 'Произошла ошибка при работе с сервером.'
	},

	session: {
		key: 'session',
		secretKey: 'secret',

		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		},

		storeOptions: {
			url: 'mongodb://localhost/newsengine',
			autoRemove: 'interval',
      		autoRemoveInterval: 10
		}
	},

	db: {
		host: 'localhost',
	    user: 'root',
	    password: '069724486',
	    database: 'r21',
	    connectionLimit: 5,
	    multipleStatements: true
	}
};

module.exports = config;
