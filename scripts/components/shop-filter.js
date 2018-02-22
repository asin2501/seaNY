module.exports = initShopFilter;

function initShopFilter() {
    let $body = $(document.body);
    let $filter = $('#shop-filter');
    let $filterHeader = $filter.find('.filter__header');
    let $filterBody = $filter.find('.filter__container');
    let $filterIcon = $filter.find('.filter__title-icon');
    let $cartButton = $('#toggle-cart');
    let $menuButton = $('.mobile-button');

    $filterHeader.click(function () {
        $filterIcon.toggleClass('filter__title-icon--active');
        $filterBody.stop().slideToggle();
        $('html').toggleClass('filter-opened');
    });

    $cartButton.click(closeFilter);
    $menuButton.click(closeFilter);
    $body.click(closeOutElement);

    function closeFilter() {
        $filterBody.slideUp();
        $('html').removeClass('filter-opened');
        if ($filterIcon.hasClass('filter__title-icon--active')) {
            $filterIcon.removeClass('filter__title-icon--active');
        }
    }

    function closeOutElement(e) {
        if (!$(e.target).closest($filterHeader.add($filterBody)).length) {
            if ($filterBody.is(":visible")) {
                closeFilter();
            }
        }
    }
}
