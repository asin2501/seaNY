module.exports = function() {

    let $productCards = $('.product-card');

    $productCards.each(function(){
        let $buttonCart = $(this).find('.js-add-to-card');

        $buttonCart.click(function(){
            let currentVariantId = $(this).attr('data-variant-id');
            cart.add(currentVariantId);
        });

        $(this).find('.product-card__size').click(function(){
            let currentVariantId = $(this).attr('data-variant-id');
            $('.product-card__size').not(this).removeClass('product-card__size--active');
            $(this).toggleClass('product-card__size--active');
            $buttonCart.attr('data-variant-id', currentVariantId);

        });

        let supervise = {};

        // $(this).find('.product-card__size').each(function(){
        //     let currentText = $(this).text();
        //
        //     if (supervise[currentText]) {
        //         $(this).remove();
        //     } else {
        //         supervise[currentText] = true;
        //     }
        // });
    });
};