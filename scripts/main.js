// let $ = require('jquery');
// require('./components/froogaloop');

let initSelect2 = require('./components/select2');
let searchWidgetInit = require('./components/search-widget');
let headerNavInit = require('./components/header-menu');
let mobileMenu = require('./components/mobile-menu');
let popup = require('./components/popup');
let customerPopup = require('./components/customer-popup');
let initSliderBanner = require('./components/slider-banner');
let scrollToBottom = require('./components/scroll-to-bottom');
let Product = require('./components/product');
let accordion = require('./components/accorderon-v');

let fadeSlider = require('./components/fade-slider');
let initStockIsts = require('./components/stockists');
let initShopFilter = require('./components/shop-filter');
let stickyHeader = require('./components/sticky-header');
let shop = require('./components/shop');
let CollectionGallery = require('./components/collection-gallery');
let createQuantitySelector = require('./components/js-quantity');
let productSizePopup = require('./components/product-size-popup');
let headerInfoBar = require('./components/header-info');

let menuFixer = require('./components/menu-fix');


let Cart = require('./components/ajax-cart');

$(document).ready(function () {
    let minicarItemTemplate = $('#minicart-item-template');
    let carItemTemplate = $('#cart-item-template');
    let cart = new Cart({
            $toggleBtn: $('#toggle-cart'),
            $cart: $('#minicart'),
            $cartQty: $('#cart-qty'),
            $itemList: $('#minicart').find('.minicart__conent'),
            $minicartPrice: $('#minicart-price'),
            $minicartErrorMsg: $('#minicart-error-msg'),
            $fullCart: $('#cart-wrap'),
            $cartForm: $('#cart-form'),
            $fullCartSummary: $('#full-cart-summary'),
        },
        minicarItemTemplate.length ? minicarItemTemplate.html() : null,
        carItemTemplate.length ? carItemTemplate.html() : null
    );

    window.cart = cart;

    menuFixer($('.header-nav'), 'two-level-nav__item--current');

    // cart.add(35371458514);
    // cart.add(35354039570);
    //35371458514
    //35354039570

    initSelect2('.js-select-2');
    initSliderBanner();
    searchWidgetInit();
    headerNavInit($('.header-nav'), '.two-level-nav__item--hasdropdown', '.two-level-nav__submenu');
    mobileMenu();
    popup();
    scrollToBottom('.js-scroll-to-bottom');
    fadeSlider($('#fade-slider'), $('#fade-nav-slider'));
    initShopFilter();
    stickyHeader($('#shopify-section-header'), 'header--sticky');
    shop();
    customerPopup();
    createQuantitySelector($('.js-quantity'));
    productSizePopup();
    headerInfoBar();

    // console.log(CollectionGallery);
    // console.log($(document.body).hasClass('shop-page'));
    if($(document.body).hasClass('shop-page')){
        let collectionGallery = new CollectionGallery($('.collection-popup'), $('.js-collection-item'));
    }


    if (window.productPage) {
        new Product(window.product, window.productOptionsNames, $('#desktop-size'), $('.option__list--colors'));
        accordion('#product-tabs', '.product-tabs__header');
        // console.log(111);
    }
    initStockIsts();
    initSocial();

    //social sharing initialization
    function initSocial() {
        $('.share-list__item').click(function () {
            let id = $(this).attr('id');
            let $addThis = $('.addthis_toolbox');

            switch (id) {
                case 'proxy-facebook':
                    $addThis.find('.addthis_button_facebook').click();
                    break;
                case 'proxy-twitter':
                    $addThis.find('.addthis_button_twitter').click();
                    break;
                case 'proxy-pinterest':
                    $addThis.find('.addthis_button_pinterest').click();
                    break;
            }
            return fasle;
        })
    }

    KlaviyoSubscribe.attachToForms('.email_signup', {
        hide_form_on_success: true
    });

});