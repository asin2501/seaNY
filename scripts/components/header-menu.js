module.exports = function ($menu, menuHasChildSelector, submenuSelector) {
    // $('two-level-nav__item--hasdropdown')
    // $('two-level-nav__submenu')
    // let $activeItem;

    let $menuHasChildList = $menu.find(menuHasChildSelector);

    if (!$menuHasChildList.length) {
        return
    }

    $menuHasChildList.find(submenuSelector).hide();

    $menuHasChildList.hover(function () {
        $(this).addClass('two-level-nav__item--active').find(submenuSelector).stop().slideDown({
            duration: 200,
            delay: 50
        });
        /*console.log();*/
    }, function () {
        $menuHasChildList.removeClass('two-level-nav__item--active').find(submenuSelector).stop().slideUp({
            duration: 150,
            delay: 50
        });
    }).children('a').click(function () {
        // return false;
    });
};