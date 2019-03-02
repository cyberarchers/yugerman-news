$(document).ready(function() {
	$('#image-upload-form input[type="file"]').on('change', function(){

		$.each(this.files, function (i, file) {
	    	setTimeout(function(){
		        var data = new FormData();

		        data.append('image', file);

		        $.ajax({
				    url: '/admin-panel/ajax/upload-image',
				    data: data,
				    cache: false,
			        contentType: false,
			        processData: false,
				    method: 'POST',
				    headers: {"X-CSRF-TOKEN": _csrf},
				    success: function(data){
						if(data.success) {
							$(`
								<div class="box is-shadowless" style="background: #D5DBDB;">
									<article class="media">
									<div class="media-left">
										<figure class="image is-64x64" style="overflow: hidden !important;">
											<img src="${data.url}" alt="Image">
										</figure>
									</div>

									<div class="media-content">
										<div class="content">
											<p>
												${data.url}
											</p>
										</div>
									</article>
								</div>
							`).appendTo("#image-upload-list").hide().fadeIn(500);
						} else {
							console.log('fail');
						}
				    },
				    error: function(error) {
				    	console.log('error');
				    }
				});
	    	}, 500 + ( i * 500 ));
	    });
	});
});