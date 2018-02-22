let cockies = require('./cockies');

module.exports = function () {
    let $popupWrapper = $('.popup-wrapper');
    let $popup = $('#subscribe-popup');
    let $closeBtn = $popup.find('#popup-close');
    let time = 3600 * 24 * 365; //one year
    let name = "SeaNYCPopup";

    $closeBtn.click(function () {
        $popupWrapper.fadeOut();
        cockies.setCookie(name, 'true', {expires: time});
        $('html').removeClass('popup-opened');
    });

    if (cockies.getCookie(name) !== 'true') {
        $('html').addClass('popup-opened');
        setTimeout(function(){
            $popupWrapper.fadeIn(400);
        }, 1000)
    }
};