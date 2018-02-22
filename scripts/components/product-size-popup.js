/**
 * Created by Alexey on 29.06.2017.
 */

module.exports = initProductSizePopup;

function initProductSizePopup() {
    let $body = $(document.body);
    let $sizePopup = $('#product-size-popup');
    let $sizeLink = $('#chart-size-link');
    let $closeButton = $('.product-size-popup__close');

    $sizeLink.click(function(e) {
        e.preventDefault();
        openSizePopup();
    });

    $closeButton.click(closeSizePopup);

    $body.click(function (event) {
        if (!$(event.target).closest($sizeLink.add($sizePopup)).length) {
            closeSizePopup();
        }
    });

    function openSizePopup() {
        $sizePopup.fadeIn();
    }

    function closeSizePopup() {
        $sizePopup.fadeOut();
    }
}