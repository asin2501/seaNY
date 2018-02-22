/**
 * Created by 2501 on 25.05.2017.
 */
module.exports = function () {
    let isOpened = false;
    let $mobileButton = $('.mobile-button');
    let $mobileMenu = $('#mobile-menu');
    let $body = $(document.body);
    let $backToTopButtonsList = $mobileMenu.find('.js-back-btn');
    let $searchButton = $('#search-button');


    let classes = {
        bodyToggleClass: 'menu-opened',
        btnToggleClass: 'mobile-button--cross',
        menuToggleClass: 'mobile-nav--opened',
        subMenuToggleClass: 'mobile-nav__item--submenu-open',
        submenuPrentClass: 'mobile-nav__item--hasdropdown',
        submenuClass: 'mobile-nav__submenu',
        menuClassWhenSubMenuOpened: 'mobile-nav--submenu-opened'
    };

    $mobileMenu.find('.' + classes.submenuPrentClass).children('a').click(openSubMenu)

    $mobileButton.click(toggleMenu);
    $backToTopButtonsList.click(backToTopLevel);

    $searchButton.click(closeMenu);


    $body.click(function (event) {
        if (!$(event.target).closest($mobileButton.add($mobileMenu)).length) {
            closeMenu();
        }
    });

    // code for close minicart on Iphone, when click outer the Minicart
    $('.minicart-shadow').click(function(){
       closeMenu();
    });

    $(window).on('touchmove', ()=>{
        if($('html').hasClass(classes.bodyToggleClass)){
            return false;
        }
    });

    function openSubMenu(e) {
        e.preventDefault();
        $mobileMenu.addClass(classes.menuClassWhenSubMenuOpened);
        $(this).parent().addClass(classes.subMenuToggleClass);
        return false;
    }


    function openMenu() {
        // console.log('open2');
        if (isOpened) {
            return false;
        } else {
            isOpened = true;
        }

        $mobileMenu.addClass(classes.menuToggleClass);
        $mobileButton.addClass(classes.btnToggleClass);
        $('html').addClass(classes.bodyToggleClass);


        return false;
    }

    function backToTopLevel() {
        $mobileMenu.find('.' + classes.subMenuToggleClass).removeClass(classes.subMenuToggleClass);
        setTimeout(() => {
                $mobileMenu.removeClass(classes.menuClassWhenSubMenuOpened);
            },
            200
        )
        return false;
    }

    function closeMenu() {
        if (isOpened) {
            isOpened = false;
        } else {
            return false;
        }

        $mobileButton.removeClass(classes.btnToggleClass);
        $mobileMenu.removeClass(classes.menuToggleClass);
        setTimeout(() => {
                $mobileMenu.removeClass(classes.menuClassWhenSubMenuOpened);
                $mobileMenu.find('.' + classes.subMenuToggleClass).removeClass(classes.subMenuToggleClass);
                $('html').removeClass(classes.bodyToggleClass);
            },
            300
        )
        return false;
    }

    function toggleMenu(e) {
        e.preventDefault();
        if (isOpened) {
            closeMenu()
        } else {
            openMenu()
        }
    }
}