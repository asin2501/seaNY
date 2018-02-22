/**
 * Created by 2501 on 05.06.2017.
 */

let handleize = require('./handleize');
module.exports = function ($mainSlider, $navSlider, customClasses) {

    if ($mainSlider.length === 0 || $navSlider.length === 0) {
        return false;
    }


    let defaultClasses = {
        navItem: 'thumbnail-line__item',
        navItemActive: 'thumbnail-line__item--active',
        mainNavItem: 'full-product__image-slider-item',
        mainNavItemActive: 'fade-slider__item--active'
    };

    let classes = customClasses || defaultClasses;
    let sliderObject;
    let $navSlides;

    classes.navItem = classes.navItem || defaultClasse.navItems;
    classes.mainNavItem = classes.mainNavItem || defaultClasses.mainNavItem;
    classes.navItemActive = classes.navItemActive || defaultClasses.navItemActive;
    classes.mainNavItemActive = classes.mainNavItemActive || defaultClasses.mainNavItemActive;

    classes.standartFilterClass = 'full-product__image-slider-item--first';

    $navSlides = $navSlider.find('.' + classes.navItem);

    let optionSelector = $('.option__list--colors');


    //if product have color selector - added color to class from alt
    if (optionSelector.length !== 0) {
        let colorOptionSelector = optionSelector.eq(0);
        let colors = [];

        colorOptionSelector.find('.option__item').each(function(){
            colors.push($(this).attr('data-value').toLowerCase());
        });

        addColorClassesFromDataAlt($navSlides, colors);
        addColorClassesFromDataAlt($mainSlider.find('.' + classes.mainNavItem), colors);
    }

    $mainSlider.slick({
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: false,
        responsive: [{
            breakpoint: 991,
            settings: {
                // arrows: true,
            }
        }]
    });

    sliderObject = $mainSlider.slick('getSlick');


    $mainSlider.slick('slickFilter', '.' + classes.standartFilterClass);

    $mainSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        let index = slick.$slides.eq(nextSlide).attr('data-index');
        let $targetNavSlide = $navSlides.filter('.item-' + index);

        $navSlides.removeClass(classes.navItemActive);
        $targetNavSlide.addClass(classes.navItemActive);
    });

    $navSlides.each(function (i) {
        $(this).click(function () {
            let index = $(this).attr('data-index');
            let slideNumber;

            sliderObject.$slides.each(function (i) {
                if (index === $(this).attr('data-index')) {
                    slideNumber = i;
                }
            });

            $mainSlider.slick('slickGoTo', slideNumber);
        })
    });

    //when color changes work this code
    let $colorSelect = $('.option__list--colors');
    if ($colorSelect.length === 0) {
        return;
    }

    // console.log(111);
    $colorSelect.find('.option__item').click(function () {
        let value = $(this).attr('data-value').toLowerCase();
        let colorClass = value ? 'color-' + value : false;

        applyFilters(colorClass);
    });

    function applyFilters(filterClass) {


        if (!filterClass) {
            $mainSlider.slick('slickUnfilter');
            $mainSlider.slick('slickFilter', '.' + classes.standartFilterClass);

            $navSlides.removeClass(classes.navItemActive).hide().eq(0).addClass(classes.navItemActive);

            $navSlides.each(function (i) {
                if (i < 4) {
                    $(this).show()
                }
            });

            $mainSlider.slick('slickGoTo', 0);

            return;
        }

        $mainSlider.slick('slickUnfilter');

        if ($mainSlider.find('.' + filterClass).length === 0) {

            applyFilters(false);

            return false;
        }

        $mainSlider.slick('slickFilter', '.' + filterClass);

        $navSlides.removeClass(classes.navItemActive).filter('.' + filterClass).show().eq(0).addClass(classes.navItemActive);
        $navSlides.not('.' + filterClass).hide();
        $mainSlider.slick('slickGoTo', 0);
    }

    function addColorClassesFromDataAlt($items, colors) {

        $items.each(function () {
            let alt = handleize($(this).attr('data-alt'));

            colors.forEach((color) => {
                // console.log(color, alt);
                if (alt.indexOf(color) !== -1) {
                    $(this).addClass('color-' + color);
                }
            });
        });
    }
}