//CSRF токен
const _csrf = $('meta[name="_csrf"]').attr('content');
//Время ожидания, после уведомления, для редиректа
const notifyTimeoutRedirect = 2000;

//Настройски уведомлений
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "100",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//Burger меню
document.addEventListener('DOMContentLoaded', function () {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {

        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

function articleUrl(url) {
    window.location.href = url;
}
