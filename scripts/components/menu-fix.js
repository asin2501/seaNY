/**
 * Created by 2501 on 07.06.2017.
 */
module.exports = function($items, className){
    if(window.location.href.indexOf('product') !== -1){
        $items.find('a[href^="/collections/"]').parent('li').addClass(className);
    }
};