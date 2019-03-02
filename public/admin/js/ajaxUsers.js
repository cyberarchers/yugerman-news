$(document).ready(function() {
	//Добавление пользователя
	var usersAddForm = $('#usersAddForm');
	var usersAddButton = $('#usersAddButton');

	usersAddForm.submit(function (event) {
		event.preventDefault();

		if($('#usersAddLogin').val().length < 1) {
			toastr.error('Логин должен содержать по меньшей мере 1 символ.');
		} else if($('#usersAddPassword').val().length < 1) {
			toastr.error('Пароль должен содержать по меньшей мере 1 символ.');
		} else {
			var formSerialized = usersAddForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/users/add',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					usersAddButton.addClass('is-loading');
					usersAddButton.prop('disabled', true);
				},
				complete: function() {
					usersAddButton.removeClass('is-loading');
					usersAddButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					}

					if(data.alreadyExists) {
						toastr.error('Пользователь уже существует.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});

	//Удаление пользователя
	var usersDeleteForm = $('#usersDeleteForm');
	var usersDeleteButton = $('#usersDeleteButton');

	usersDeleteForm.submit(function (event) {
		event.preventDefault();

		var formSerialized = usersDeleteForm.serializeArray();
		formSerialized.push({ name: '_csrf', value: _csrf });

		$.ajax({
			type: 'POST',
			url: '/admin-panel/ajax/users/delete',
			data: formSerialized,
			dataType: 'json',
			beforeSend: function() {
				usersDeleteButton.addClass('is-loading');
				usersDeleteButton.prop('disabled', true);
			},
			complete: function() {
				usersDeleteButton.removeClass('is-loading');
				usersDeleteButton.prop('disabled', false);
			},
			success: function(data) {
				if(data.success) {
					toastr.success('Перенаправление...', 'Выполнено!');

					setTimeout(function() {
						window.location = '/admin-panel/dashboard/';
					}, notifyTimeoutRedirect);
				} else {
					toastr.error('Пользователь не найден.');
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});


	//Редактирование пользователя
	var usersEditForm = $('#usersEditForm');
	var usersEditButton = $('#usersEditButton');

	usersEditForm.submit(function (event) {
		event.preventDefault();

		if($('#usersEditPassword').val().length < 1) {
			toastr.error('Пароль должен содержать по меньшей мере 1 символ.');
		} else {
			var formSerialized = usersEditForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/users/edit',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					usersEditButton.addClass('is-loading');
					usersEditButton.prop('disabled', true);
				},
				complete: function() {
					usersEditButton.removeClass('is-loading');
					usersEditButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					} else {
						toastr.error('Пользователь не найден.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});