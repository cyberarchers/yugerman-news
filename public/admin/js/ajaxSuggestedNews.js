$(document).ready(function() {
	//Удаление новости
	var suggestedNewsDeleteForm = $('#suggestedNewsDeleteForm');
	var suggestedNewsDeleteButton = $('#suggestedNewsDeleteButton');

	suggestedNewsDeleteForm.submit(function (event) {
		event.preventDefault();

		var formSerialized = suggestedNewsDeleteForm.serializeArray();
		formSerialized.push({ name: '_csrf', value: _csrf });

		$.ajax({
			type: 'POST',
			url: '/admin-panel/ajax/suggestedNews/delete',
			data: formSerialized,
			dataType: 'json',
			beforeSend: function() {
				suggestedNewsDeleteButton.addClass('is-loading');
				suggestedNewsDeleteButton.prop('disabled', true);
			},
			complete: function() {
				suggestedNewsDeleteButton.removeClass('is-loading');
				suggestedNewsDeleteButton.prop('disabled', false);
			},
			success: function(data) {
				if(data.success) {
					toastr.success('Перенаправление...', 'Выполнено!');

					setTimeout(function() {
						window.location = '/admin-panel/dashboard/';
					}, notifyTimeoutRedirect);
				} else {
					toastr.error('Предложенная новость не найдена.');
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});


	//Редактирование новости
	var suggestedNewsEditForm = $('#suggestedNewsEditForm');
	var suggestedNewsEditButton = $('#suggestedNewsEditButton');

	suggestedNewsEditForm.submit(function (event) {
		event.preventDefault();

		if($('#suggestedNewsEditTitle').val().length < 6) {
			toastr.error('Введите заголовок больше 6 символов.');
		} else if(!/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png))/.test($('#suggestedNewsEditPreviewImage').val())) {
			toastr.error('Введите корректную ссылку на превью.');
		} else {
			var formSerialized = suggestedNewsEditForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/suggestedNews/edit',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					suggestedNewsEditButton.addClass('is-loading');
					suggestedNewsEditButton.prop('disabled', true);
				},
				complete: function() {
					suggestedNewsEditButton.removeClass('is-loading');
					suggestedNewsEditButton.prop('disabled', false);
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
});