$(document).ready(function() {
	//Добавление новости
	var newsAddForm = $('#newsAddForm');
	var newsAddButton = $('#newsAddButton');

	newsAddForm.submit(function (event) {
		event.preventDefault();

		if($('#newsAddTitle').val().length < 6) {
			toastr.error('Введите заголовок больше 6 символов.');
		} else if(!/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png))/.test($('#newsAddPreviewImage').val())) {
			toastr.error('Введите корректную ссылку на превью.');
		} else {
			var formSerialized = newsAddForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/news/add',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					newsAddButton.addClass('is-loading');
					newsAddButton.prop('disabled', true);
				},
				complete: function() {
					newsAddButton.removeClass('is-loading');
					newsAddButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					}

					if(data.categoriesOrRegionsNotSelected) {
						toastr.error('Выберите хотябы одну категорию и один регион.');
					}

					if(data.alreadyExists) {
						toastr.error('Новость уже существует.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});

	//Удаление новости
	var newsDeleteForm = $('#newsDeleteForm');
	var newsDeleteButton = $('#newsDeleteButton');

	newsDeleteForm.submit(function (event) {
		event.preventDefault();

		var formSerialized = newsDeleteForm.serializeArray();
		formSerialized.push({ name: '_csrf', value: _csrf });

		$.ajax({
			type: 'POST',
			url: '/admin-panel/ajax/news/delete',
			data: formSerialized,
			dataType: 'json',
			beforeSend: function() {
				newsDeleteButton.addClass('is-loading');
				newsDeleteButton.prop('disabled', true);
			},
			complete: function() {
				newsDeleteButton.removeClass('is-loading');
				newsDeleteButton.prop('disabled', false);
			},
			success: function(data) {
				if(data.success) {
					toastr.success('Перенаправление...', 'Выполнено!');

					setTimeout(function() {
						window.location = '/admin-panel/dashboard/';
					}, notifyTimeoutRedirect);
				} else {
					toastr.error('Новость не найдена.');
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});


	//Редактирование новости
	var newsEditForm = $('#newsEditForm');
	var newsEditButton = $('#newsEditButton');

	newsEditForm.submit(function (event) {
		event.preventDefault();

		if($('#newsEditTitle').val().length < 6) {
			toastr.error('Введите заголовок больше 6 символов.');
		}  else if(!/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png))/.test($('#newsEditPreviewImage').val())) {
			toastr.error('Введите корректную ссылку на превью.');
		} else {
			var formSerialized = newsEditForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/news/edit',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					newsEditButton.addClass('is-loading');
					newsEditButton.prop('disabled', true);
				},
				complete: function() {
					newsEditButton.removeClass('is-loading');
					newsEditButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					} else if (data.categoriesOrRegionsNotSelected) {
						toastr.error('Выберите хотябы одну категорию и один регион.');
					}else if(data.busyID) {
						toastr.error('Такой заголовок уже занят другой новостью.');
					} else {
						toastr.error('Новость не найдена.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});