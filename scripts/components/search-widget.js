module.exports = initSearch;
function initSearch() {
    let $headerSearch = $('.header-search'),
        $searchButton = $('#search-button'),
        $mobileCloseButton = $('.header-search-mobile__close'),
        activeClass = 'header-search--opened',
        $header = $('.header'),
        $minicart = $('#minicart');


    $searchButton.click(function (e) {

        if (!$headerSearch.hasClass(activeClass)) {
            $headerSearch.addClass(activeClass);
            $header.addClass('header--search-is-active');
            return false;
        }
    });

    $('.header-search__input').click(function () {
        return false;
    });

    $mobileCloseButton.click(closeSearch);
    $(document.body).click(closeSearch);

    function closeSearch() {
        if ($(this).closest($searchButton.add($('.header-search__input'))).length === 0) {
            $headerSearch.removeClass(activeClass);
            $header.removeClass('header--search-is-active');
        }
    }
}