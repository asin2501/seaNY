/**
 * Created by 2501 on 02.06.2017.
 */
module.exports = function ($header, stickyClass, bodyClass) {

    if($header.length){

        stickyClass = stickyClass || 'sticky';
        bodyClass = bodyClass || 'header-sticky';

        setState();

        $(window).on('scroll', setState);
    }

    function setState() {
        if( $(window).scrollTop() < 20){
            $header.removeClass(stickyClass);
            $(document.body).removeClass(bodyClass);
        }else{
            $header.addClass(stickyClass);
            $(document.body).addClass(bodyClass);
        }
    }
}