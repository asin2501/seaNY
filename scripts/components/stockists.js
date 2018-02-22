module.exports = initStockIsts;

function initStockIsts() {

    let $countryContainer = $('.stockists__country-container');
    let $backLink = $countryContainer.find('#stockists-back');
    let $countryList = $countryContainer.find('.country-list');
    let $countryListLink = $countryList.find('.country-list__link');
    let $countryShopContainer = $countryContainer.find('.stockists__shops-container');
    let $singleShop = $countryShopContainer.find('.stockists__shop');


    $countryListLink.click(function(e) {
        var currentCountry = $(this).attr('data-country');
        e.preventDefault();
        $backLink.show();
        $countryList.hide();
        $countryShopContainer.removeClass('hide');

        $singleShop.each(function(){
            if ( $(this).attr('data-country') === currentCountry ) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });

    });

    $backLink.click(function(e){
        e.preventDefault();
        $countryShopContainer.addClass('hide');
        $countryList.show();
        $(this).hide();
        $singleShop.attr('style','');
    });

}
