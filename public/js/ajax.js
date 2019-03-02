$(document).ready(() => {
	/**
	 * Запрос новостей из базы, исходя из фильтра
	 *
	 * @param  {[type]} '#apply-filter').on('click', (             [description]
	 * @return {[type]}                              [description]
	 */
	$('#applyFilter').on('click', function() {
		var selectedCategories = [];
		var selectedRegions = [];

		//Смотрим выбранные категории
		$('#filterCategories input:checked').each(function () {
		    selectedCategories.push($(this).attr('value'));
		});

		//Смотрим выбранные регионы
		$('#filterRegions input:checked').each(function () {
		    selectedRegions.push($(this).attr('value'));
		});

		//Отправляем запрос на получение новостей, соответствующих фильтру
		$.ajax({
			type: 'POST',
			url: '/ajax/getNewsFromFilter',
			data: { categories: selectedCategories, regions: selectedRegions, _csrf: _csrf },
			dataType: 'json',
			beforeSend: function() {
				$('#applyFilter').addClass('is-loading');
				$('#applyFilter').prop('disabled', true);
			},
			complete: function() {
				$('#applyFilter').removeClass('is-loading');
				$('#applyFilter').prop('disabled', false);
			},
			success: function(data) {
				$('#articles').html('');

				if(data.length > 0) {
				    $('#articles').append(`
				        <div class="title is-4">
					        Последние новости
					    </div>
    			    `);

					var response = '';

					data.forEach(function(item, index, arr) {
						response += '<div class="columns">';

						item.forEach(function(article, index, arr) {
							var date = new Date(article.date);

						    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
						    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
						    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

						    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
						    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
						    var year = date.getFullYear();

							response += '<div class="column is-4">';
								response += '<div class="blue-shadow" style="position: relative !important;">';
									response += '<figure class="image">';
										response += `<img src="${ article.preview_image }">`;
									response += '</figure>';


									response += '<div class="news-date">';
										response += `${hours}:${minutes}:${seconds} | ${day}.${month}.${year}`;
									response += '</div>';
									response += '<div class="news-title">';
										response += `<a href="/article/${ article.id }">${ article.title }</a>`;
									response += '</div>';
									response += '<div class="news-short-content">';
										response += article.short_content;
									response += '</div>';
								response += '</div>';
							response += '</div>';
						});

						response += '</div>';
					});

					$('#articles').append(response);
				} else {
					$('#articles').html(`
					    <div class="title is-4">
					        Последние новости
					    </div>

						<div class="columns">
							<div class="column">
		        				<div class="box blue-shadow is-radiusless">
	        						Новости не найдены!
	        					</div>
							</div>
						</div>
					`);
				}
			},
			error: function(error) {
				toastr.error('Ошибка при выполнении запроса.');
			}
		});
	});

	//Добавление предложенной новости
	var addSuggestedForm = $('#addSuggestedForm');
	var addSuggestedButton = $('#addSuggestedButton');

	addSuggestedForm.submit(function (event) {
		event.preventDefault();

		var allIsCorrect = true;

		var emailInput = $('#addSuggestedContactEmail');
		var phoneInput = $('#addSuggestedContactPhone');
		var contentTextarea = $('#addSuggestedContent');

		if(emailInput.val().length > 0) {
			if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.val())) {
				allIsCorrect = false;

				toastr.error('Введите корректный email адрес.');
			}
		}

		if(phoneInput.val().length > 0) {
			if(!/^((\+7|7|8)+([0-9]){10})$/.test(phoneInput.val())) {
				allIsCorrect = false;

				toastr.error('Введите корректный номер телефона.');
			}
		}

		if(contentTextarea.val().length < 100) {
			allIsCorrect = false;

			toastr.error('Текст Вашей новости должен содержать <b>не менее 100</b> символов.');
		} else if(contentTextarea.val().length > 1000) {
			allIsCorrect = false;

			toastr.error('Текст Вашей новости должен содержать <b>не более 1000</b> символов.');
		} else {
			//
		}

		if(allIsCorrect) {
			var formSerialized = addSuggestedForm.serializeArray();
			formSerialized.push({ name: '_csrf', value: _csrf });

			$.ajax({
				type: 'POST',
				url: '/ajax/addSuggested',
				data: formSerialized,
				dataType: 'json',
				beforeSend: function() {
					addSuggestedButton.addClass('is-loading');
					addSuggestedButton.prop('disabled', true);
				},
				complete: function() {
					addSuggestedButton.removeClass('is-loading');
					addSuggestedButton.prop('disabled', false);
				},
				success: function(data) {
					if(data.success) {
						toastr.success('Новость отправлена на модерацию. Перенаправление...', 'Выполнено!');

						setTimeout(function() {
							window.location = '/';
						}, notifyTimeoutRedirect);
					}
				},
				error: function(error) {
					toastr.error('Ошибка при выполнении запроса.');
				}
			});
		}
	});
});
