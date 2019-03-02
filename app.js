'use strict';

/**
 * Модули
 */

var express = require('express'),
	morgan = require('morgan'),
	Twig = require('twig'),
	path = require('path'),
	http = require('http'),
	https = require('https'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	csurf = require('csurf'),
	crypto = require('crypto'),
	mime = require('mime'),
	multer  = require('multer'),
	app = express();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},

	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
		});
	}
});	

var upload = multer({ 
	storage: storage,

	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);

        if(ext !== '.png' && ext !== '.jpg' && ext !== '.bmp' && ext !== '.jpeg') {
            callback(null, false);
        } else {
        	callback(null, true);
        }
    },

	limits: {
		fileSize: 10 * 1024 * 1024
	}
});

/**
 * Настройки
 *
 * @type {[type]}
 */

var config = require('./config');

/**
 * Экспресс & маршруты модулей
 */

global.sessionStore = new MongoStore(config.session.storeOptions);

//Логирование
if(config.mode == 'dev')
	app.post('*', morgan('[:date[clf]] : [:method :url :status - :response-time ms]'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	key: config.session.key,
	secret: config.session.secretKey,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: config.session.cookie.maxAge,
		path: '/',
		httpOnly: false
	},
	store: global.sessionStore
}));

app.use(csurf({ cookie: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/css', express.static(__dirname + '/node_modules/bulma/css'));
app.use('/css', express.static(__dirname + '/node_modules/toastr/build'));
app.use('/css', express.static(__dirname + '/node_modules/swiper/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/toastr/build'));
app.use('/js', express.static(__dirname + '/node_modules/swiper/dist/js'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use('/uploads', express.static(__dirname + '/uploads'));

//CSRF токен доступный всем шаблонам
app.use(function(req, res, next) {
	res.locals = {
		csrfToken: req.csrfToken(),

		title: config.siteTitle,
		adminPanelTitle: config.siteAdminPanelTitle,
	};

	next();
});

/**
 * Экспресс движок рендеринга
 */

app.engine('html', Twig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

/**
 * Наши роуты
 */

const mainRoutes = require('./routes/mainRoutes');
const ajaxRoutes = require('./routes/ajaxRoutes');

app.use('/', mainRoutes);
app.use('/ajax', ajaxRoutes);

/**
 * Наши роуты админки
 */

const adminMainRoutes = require('./routes/admin/adminMainRoutes');
const adminAjaxRoutes = require('./routes/admin/adminAjaxRoutes');

app.use('/admin-panel', adminMainRoutes);
app.use('/admin-panel/ajax', adminAjaxRoutes);

/**
 *
 * Загрузка изображений
 * 
 */

app.post('/admin-panel/ajax/upload-image', upload.single('image'), (req, res) => {
    if(req.file) {
    	res.status(200).send({success: true, url: req.protocol + '://' + req.headers.host + '/uploads/' + req.file.filename});
    } else {
    	res.status(200).send({success: false});
    }
});

/**
 * 404
 */
app.get('*', (req, res) => {
	res.render('templates/errors/404');
});

/**
 * Запуск приложения
 *
 * @param  {[type]} process.argv[2] [description]
 * @return {[type]}                 [description]
 */
switch(process.argv[2]) {
	default:
		http.createServer(app).listen(7002);

		console.log('Default server started at port :7002');
}
