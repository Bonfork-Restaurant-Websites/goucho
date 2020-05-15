// MENU
(function () {
    function getScrollBarWidth() {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth; // force scrollbars

        outer.style.overflow = 'scroll'; // add innerdiv

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth; // remove divs

        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }


    var button = $('.header__menu-button');
    var panel = $('.header__menu');
    var overlay = $('.header__overlay');

    function openMenu() {
        var scrollBarWidth = window.innerWidth > document.querySelector('body').offsetWidth ? getScrollBarWidth() : 0;
        $('body').css({
            overflow: 'hidden',
            paddingRight: "".concat(scrollBarWidth, "px")
        });
        $(overlay).fadeIn(300);
    };

    function hideMenu() {
        $('body').css({
            overflow: '',
            paddingRight: ''
        });
        button.css({
            marginRight: ''
        });
        $(overlay).fadeOut(300);
    };

    button.on('click', function () {
        button.toggleClass('header__menu-button_cross');
        button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
        panel.toggleClass('header__menu_opened');


        if (button.hasClass('header__menu-button_cross')) {
            openMenu();
        } else {
            hideMenu();
        }
    });

    overlay.on('click', function () {
        button.toggleClass('header__menu-button_cross');
        button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
        panel.toggleClass('header__menu_opened');

        if (button.hasClass('header__menu-button_cross')) {
            openMenu();
        } else {
            hideMenu();
        }
    });
})();



// Owl Carousel Config
$('.owl-carousel').owlCarousel({
    items: 1
});


// Phone number input
let telInput = $("#phone");

// initialize
telInput.intlTelInput({
    initialCountry: 'auto',
    separateDialCode: true,
    autoPlaceholder: 'aggressive',
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js",
    geoIpLookup: function (callback) {
        fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe', {
            cache: 'reload'
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Failed: ' + response.status)
        }).then(ipjson => {
            callback(ipjson.country_code)
        }).catch(e => {
            callback('ca')
        })
    }
});

// Phone number input
let telInput2 = $("#reservation-phone");

// initialize
telInput2.intlTelInput({
    initialCountry: 'auto',
    separateDialCode: true,
    autoPlaceholder: 'aggressive',
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js",
    geoIpLookup: function (callback) {
        fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe', {
            cache: 'reload'
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Failed: ' + response.status)
        }).then(ipjson => {
            callback(ipjson.country_code)
        }).catch(e => {
            callback('ca')
        })
    }
});

$(document).ready(function () {
    $('.footer-img').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

if ($('#contact-form').length) {
    $('#contact-form').each(function(){
        $(this).validate({
            errorClass: 'error wobble-error',
            submitHandler: function(form){
                $.ajax({
                    type: "POST",
                    url:"./includes/mail-2.php",
                    data: $(form).serialize(),
                    success: function() {
                        document.querySelector('.alert-worked').style.display = 'block';
                        document.getElementById('contact-form').style.display = 'none';
                        console.log("Success");
                    },

                    error: function(){
                        document.querySelector('.alert-not-worked').style.display = 'block';
                        document.getElementById('contact-form').style.display = 'none';
                        console.log("Fail");
                    }
                });
            }
        });
    });
}
