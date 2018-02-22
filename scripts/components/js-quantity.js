/**
 * Created by 2501 on 27.06.2017.
 */

module.exports = createQuantitySelector;

function createQuantitySelector($element) {
    let $input = $element.eq(0).find('.js-quantity-input');

    if($element.length == 0 ){
        return false;
    }

    $element.find('.js-quantity-minus').click(() => {
        chnage(-1);
    });

    $element.find('.js-quantity-plus').click(() => {
        chnage(+1);
    });

    function chnage(num) {
        let val = +$input.text();

        val += num;
        // console.log(num);

        if (val > 0 && val < 1000) {
            $input.text(val);
        }

    }
}
