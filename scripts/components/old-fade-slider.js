module.exports = function ($mainSlider, $navSlider, customClasses) {

    if ($mainSlider.length === 0 || $navSlider.length === 0) {
        return false;
    }

    let defaultClasses = {
        navItem: 'thumbnail-line__item',
        navItemActive: 'thumbnail-line__item--active',
        mainNavItem: 'fade-slider__item',
        mainNavItemActive: 'fade-slider__item--active'
    };

    let classes = customClasses || defaultClasses;

    classes.navItem = classes.navItem || defaultClasse.navItems;
    classes.mainNavItem = classes.mainNavItem || defaultClasses.mainNavItem;
    classes.navItemActive = classes.navItemActive || defaultClasses.navItemActive;
    classes.mainNavItemActive = classes.mainNavItemActive || defaultClasses.mainNavItemActive;

    let $slides = $mainSlider.find('.' + classes.mainNavItem);
    let $navSlides = $navSlider.find('.' + classes.navItem);
    let current = 0;



    $navSlides.each(function (i) {
        $(this).click(function (){
            $navSlides.eq(current).removeClass(classes.navItemActive);
            $(this).addClass(classes.navItemActive);
            $slides.eq(current).removeClass(classes.mainNavItemActive);
            current = i;
            $slides.eq(current).addClass(classes.mainNavItemActive);
        })
    })
};
