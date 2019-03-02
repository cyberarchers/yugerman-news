$(document).ready(function() {
	//Авторизация
	$('#authButton').on('click', function() {
		var login = $('#authForm input:text');
		var password = $('#authForm input:password');

		login.removeClass('is-danger');
		password.removeClass('is-danger');

		if(login.val() == '') {
			login.addClass('is-danger');
		} else if (password.val() == '') {
			password.addClass('is-danger');
		} else {
			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/auth/login',
				data: { login: login.val(), password: password.val(), _csrf: _csrf },
				dataType: 'json',
				beforeSend: function() {
					$('#authButton').addClass('is-loading');
					$('#authButton').prop('disabled', true);
				},
				complete: function() {
					$('#authButton').removeClass('is-loading');
					$('#authButton').prop('disabled', false);
				},
				success: function(data) {
					if(data.found) {
						if(data.role == 'administrator') {
							toastr.success('Через несколько секунд Вы будете перенаправлены в личный кабинет администратора.', `Здравствуйте ${data.login}!`);
						} else {
							toastr.success('Через несколько секунд Вы будете перенаправлены в личный кабинет модератора.', `Здравствуйте ${data.login}!`);
						}

						setTimeout(function(){ 
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					} else {
						toastr.error('Неудача! Пользователь не найден, попробуйте снова.')
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});

	//Выход
	$('#logoutLink').on('click', function() {
		//Получаение идентификатора сессии
		toastr.info('Получение идентификатора сессии.');

		//Если сессия есть
		if(!$.cookie('session')) {
			toastr.error('Текущая сессия истекла, перезагрузите страницу.');
		} else {
			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/auth/logout',
				data: { _csrf: _csrf },
				dataType: 'json',
				timeout: 5000,
				success: function(data) {
					if(data.sessionDestroyed) {
						toastr.info(`Идентификатор сессии обнаружен. Завершаем сеанс.`);

						setTimeout(function() {
							window.location = '/admin-panel/index/';
						}, notifyTimeoutRedirect);
					} else {
						toastr.error('Не удалось завершить сеанс.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});