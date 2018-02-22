/**
 * Created by 2501 on 30.05.2017.
 */
module.exports = function ($elem) {

    $elem = $($elem);

    if(!$elem.length){
        return;
    }

    $elem.each(function (){
        let $elem = $(this);
        $elem.click((e)=>{
            e.preventDefault()
            let $parent = $($elem.attr('href'));
            let fullOffset = $parent.offset().top + $parent.outerHeight();
            $('body, html').animate({scrollTop: fullOffset}, 800);
        });
    })
}