$(document).ready(function() {
	//Добавление региона
	var regionsAddForm = $('#regionsAddForm');
	var regionsAddButton = $('#regionsAddButton');

	regionsAddForm.submit(function (event) {
		event.preventDefault();

		if($('#regionsAddName').val().length < 3) {
			toastr.error('Введите имя больше 3 символов.');
		} else {
			var formSerialized = regionsAddForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/regions/add',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					regionsAddButton.addClass('is-loading');
					regionsAddButton.prop('disabled', true);
				},
				complete: function() {
					regionsAddButton.removeClass('is-loading');
					regionsAddButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					}

					if(data.alreadyExists) {
						toastr.error('Регион уже существует.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});

	//Удаление региона
	var regionsDeleteForm = $('#regionsDeleteForm');
	var regionsDeleteButton = $('#regionsDeleteButton');

	regionsDeleteForm.submit(function (event) {
		event.preventDefault();

		var formSerialized = regionsDeleteForm.serializeArray();
		formSerialized.push({ name: '_csrf', value: _csrf });

		$.ajax({
			type: 'POST',
			url: '/admin-panel/ajax/regions/delete',
			data: formSerialized,
			dataType: 'json',
			beforeSend: function() {
				regionsDeleteButton.addClass('is-loading');
				regionsDeleteButton.prop('disabled', true);
			},
			complete: function() {
				regionsDeleteButton.removeClass('is-loading');
				regionsDeleteButton.prop('disabled', false);
			},
			success: function(data) {
				if(data.success) {
					toastr.success('Перенаправление...', 'Выполнено!');

					setTimeout(function() {
						window.location = '/admin-panel/dashboard/';
					}, notifyTimeoutRedirect);
				} else {
					toastr.error('Регион не найден.');
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});


	//Редактирование региона
	var regionsEditForm = $('#regionsEditForm');
	var regionsEditButton = $('#regionsEditButton');

	regionsEditForm.submit(function (event) {
		event.preventDefault();

		if($('#regionsEditName').val().length < 3) {
			toastr.error('Введите имя больше 3 символов.');
		} else {
			var formSerialized = regionsEditForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/admin-panel/ajax/regions/edit',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					regionsEditButton.addClass('is-loading');
					regionsEditButton.prop('disabled', true);
				},
				complete: function() {
					regionsEditButton.removeClass('is-loading');
					regionsEditButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/admin-panel/dashboard/';
						}, notifyTimeoutRedirect);
					} else if(data.busyID) {
						toastr.error('Такое имя региона уже существует.');
					} else {
						toastr.error('Регион не найден.');
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});