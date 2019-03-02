$(document).ready(function() {
	//Добавление категории
	var categoriesAddForm = $('#categoriesAddForm');
	var categoriesAddButton = $('#categoriesAddButton');

	categoriesAddForm.submit(function (event) {
		event.preventDefault();

		if($('#categoriesAddName').val().length < 3) {
			toastr.error('Введите имя больше 3 символов.');
		} else {
			var formSerialized = categoriesAddForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/categories/add',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					categoriesAddButton.addClass('is-loading');
					categoriesAddButton.prop('disabled', true);
				},
				complete: function() {
					categoriesAddButton.removeClass('is-loading');
					categoriesAddButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					}

					if(data.alreadyExists) {
						toastr.error('Категория уже существует.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});

	//Удаление категории
	var categoriesDeleteForm = $('#categoriesDeleteForm');
	var categoriesDeleteButton = $('#categoriesDeleteButton');

	categoriesDeleteForm.submit(function (event) {
		event.preventDefault();

		var formSerialized = categoriesDeleteForm.serializeArray();
		formSerialized.push({ name: '_csrf', value: _csrf });

		$.ajax({
			type: 'POST',
			url: '/admin-panel/ajax/categories/delete',
			data: formSerialized,
			dataType: 'json',
			beforeSend: function() {
				categoriesDeleteButton.addClass('is-loading');
				categoriesDeleteButton.prop('disabled', true);
			},
			complete: function() {
				categoriesDeleteButton.removeClass('is-loading');
				categoriesDeleteButton.prop('disabled', false);
			},
			success: function(data) {
				if(data.success) {
					toastr.success('Перенаправление...', 'Выполнено!');

					setTimeout(function() {
						window.location = '/admin-panel/dashboard/';
					}, notifyTimeoutRedirect);
				} else {
					toastr.error('Категория не найдена.');
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});


	//Редактирование категории
	var categoriesEditForm = $('#categoriesEditForm');
	var categoriesEditButton = $('#categoriesEditButton');

	categoriesEditForm.submit(function (event) {
		event.preventDefault();

		if($('#categoriesEditName').val().length < 3) {
			toastr.error('Введите имя больше 3 символов.');
		} else {
			var formSerialized = categoriesEditForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/categories/edit',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					categoriesEditButton.addClass('is-loading');
					categoriesEditButton.prop('disabled', true);
				},
				complete: function() {
					categoriesEditButton.removeClass('is-loading');
					categoriesEditButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					} else if (data.busyID) {
						toastr.error('Такое имя категории уже существует.');
					} else {
						toastr.error('Категория не найдена.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});