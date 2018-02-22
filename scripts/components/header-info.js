/**
 * Created by Alexey on 29.06.2017.
 */
module.exports = function() {
    let $infoBar = $('.header__skinny-header');
    let $closeButton = $('.header__skinny-header-close');
    let $minicart = $('#minicart');

    $closeButton.click(function() {
        $infoBar.removeClass('header__skinny-header--opened');
        // $minicart.removeClass('infobar-opened');
        $(document.body).removeClass('infobar-opened');
        $infoBar.slideUp();
    });

    if ($infoBar.hasClass('header__skinny-header--opened')) {
        $(document.body).addClass('infobar-opened');
    }

};