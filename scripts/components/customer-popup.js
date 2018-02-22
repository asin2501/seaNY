module.exports = function() {
    let $body = $(document.body);
    let $loginLink = $('.js-login').find('a');
    let $regLink = $('.js-register').find('a');
    let $loginCloseBtn = $('#login-close');
    let $registerCloseBtn = $('#register-close');

    let $mobileMenu = $('#mobile-menu');
    let $mobileButton = $('.mobile-button');

    let $loginPopup = $('#login-popup');
    let $loginPopupInner = $loginPopup.find('.customer-container');
    let $registerPopup = $('#register-popup');
    let $registerPopupInner = $registerPopup.find('.customer-container');

    let locationName = window.location.pathname;

    if (locationName.indexOf('account') === 1) {
        return;
    }

    openPopup($loginLink, $loginPopup);
    openPopup($regLink, $registerPopup);

    $loginCloseBtn.click(function() {
        closePopup($loginPopup);
    });

    $registerCloseBtn.click(function() {
       closePopup($registerPopup);
    });

    $body.click(function (event) {
        if (!$(event.target).closest($loginLink.add($loginPopupInner)).length) {
            closePopup($loginPopup);
        }
    });

    $body.click(function (event) {
        if (!$(event.target).closest($regLink.add($registerPopupInner)).length) {
            closePopup($registerPopup);
        }
    });

    function openPopup($clickedElement, $popup) {
        $clickedElement.click(function(e) {
            e.preventDefault();
            $popup.fadeIn();

            if ($mobileMenu.hasClass('mobile-nav--opened') && $mobileButton.hasClass('mobile-button--cross')) {
                $mobileMenu.removeClass('mobile-nav--opened');
                $mobileButton.removeClass('mobile-button--cross');
            }
        });
    }

    function closePopup(element) {
        element.fadeOut();
    }

};