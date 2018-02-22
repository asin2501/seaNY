/**
 * Created by 2501 on 01.06.2017.
 */
let Handlebars = require('handlebars');
let money = require('./format-money');
let image = require('./image-size');

class Cart {
    constructor(elements, template, fullCartTemplate) {
        const theCart = this;
        if (elements.$toggleBtn === undefined || elements.$cart === undefined || elements.$cartQty === undefined || elements.$minicartPrice === undefined || elements.$minicartErrorMsg === undefined) {
            console.error('ajax-cart error one of thi item is undefined : elements.$toggleBtn, elements.$cart, elements.$cartQty,  elements.$minicartPrice, elements.$minicartErrorMsg');
        }

        this.elements = {
            $toggleBtn: elements.$toggleBtn,
            $cart: elements.$cart,
            $itemList: elements.$itemList,
            $cartQty: elements.$cartQty,
            $minicartPrice: elements.$minicartPrice,
            $minicartErrorMsg: elements.$minicartErrorMsg,
            $fullCart: elements.$fullCart,
            $fullCartSummary: elements.$fullCartSummary,
            $cartForm: elements.$cartForm
        };

        this.isOpened = false;
        this.imagesSize = '500x';
        this.format = '${{amount_no_decimals_with_space_separator}}';

        this.itemListTemplate = Handlebars.compile(template || $('#minicart-item-template').html());

        if (fullCartTemplate && fullCartTemplate.length) {
            this.fullCartTemplate = Handlebars.compile(fullCartTemplate);
        }


        this.classes = {
            cartActive: 'minicart--opened',
            bodyCartActive: 'minicart-opened',
            removeBtn: 'js-remove-minicart-item',
            qty: 'cart-item__qty-input'
        };

        this.elements.$toggleBtn.click(this.toggleCart.bind(this));


        $(document.body).click((event) => {
            let $target = $(event.target);

            if ($target.hasClass('js-add-to-card')) {
                return
            }

            if (!$(event.target).closest(this.elements.$toggleBtn.add(this.elements.$cart).add(this.elements.$minicartErrorMsg)).length) {
                this.closeCart();
            }
        });

        this.elements.$minicartErrorMsg.click(() => {
            this.elements.$minicartErrorMsg.stop().fadeOut('400');
        })


        this.elements.$cart.on('click', '.' + this.classes.removeBtn, function (e) {
            theCart.remove($(this).attr('href'));
            e.preventDefault();
        })

        this.getCart(this.renderCart.bind(this));

        if (this.elements.$fullCart && this.elements.$fullCart.length) {
            this.initFullCart();
        }

        this.elements.$cart.find('.minicart__conent').on('touchmove scroll', (e)=>{e.stopPropagation()});

    }


    initFullCart() {
        let theCart = this;
        this.elements.$fullCart.on('input', '.' + this.classes.qty, function () {

            let regExpNumbers = /[0-9]/;
            let val = $(this).val();
            let oldVal = $(this).attr('data-old-value');

            if (regExpNumbers.test(val) && +val >= 1) {
                // $(this).attr('data-old-value',val);
            } else {
                $(this).val(oldVal);
            }
        }).on('blur', '.' + this.classes.qty, function () {
            let val = $(this).val();
            let oldVal = $(this).attr('data-old-value');
            let id = $(this).attr('data-item-id');
            val = +val;
            oldVal = +oldVal;


            if (val > oldVal) {
                theCart.add(id, val - oldVal, true, theCart.refreshCart.bind(theCart));
            } else {
                theCart.update(id, val);
            }

        });

        this.elements.$cartForm.on('submit', function () {
            $(this).find('.' + theCart.classes.qty).filter(':focus').trigger('blur');
            return false;
        });

        this.elements.$fullCart.on('click', '.js-remove-cart-item', function () {

            theCart.remove($(this).attr('href'));
            $(this).parent('.cart-item').hide();
            return false;
        })
    }

    add(id, quantity = 1, silent = false, fail) {
        console.log('---', id, quantity);
        $.ajax({
            url: '/cart/add.js',
            method: 'POST',
            dataType: 'json',
            data: {
                quantity: quantity,
                id: id
            },
        }).done((data) => {
            if (!silent) {
                this.getCart(this.renderAndOpenCart.bind(this));
            } else {
                this.getCart(this.renderCart.bind(this));
            }
        }).fail((jqXHR, textStatus, errorThrown) => {
            this.elements.$minicartErrorMsg.stop().fadeIn('400');
            setTimeout(() => {
                this.elements.$minicartErrorMsg.stop().fadeOut('3000');
            }, 5000);
            if (fail) {
                fail();
            }
        });
    }

    // addToCart(id, quantity, success, error){}

    formatItems(items) {
        let formatedItemList = items.map((item) => {
            item.price = money(item.price, this.format);
            item.image = image(item.image, this.imagesSize);


            if (item.variant_options[0]) {
                item.size = item.variant_options[0];
            }
            if (item.variant_options[1]) {
                item.color = item.variant_options[1];
            }

            return item;
        });

        if (!formatedItemList.length) {
            formatedItemList = false;
        }

        return formatedItemList;

    }

    getCart(callback) {
        // debugger;
        $.getJSON('/cart.js', callback);
    }

    update(id, quantity) {
        $.ajax({
            url: '/cart/change.js',
            method: 'POST',
            dataType: 'json',
            data: {
                quantity: quantity,
                id: id
            },
        }).done((data) => {
            this.renderCart(data);
        });
    }

    remove(id) {
        $.ajax({
            url: '/cart/change.js',
            method: 'POST',
            dataType: 'json',
            data: {
                quantity: 0,
                id: id
            },
        }).done((data) => {

            $('#minicart-item-' + id).slideUp(300, () => {
                this.renderCart(data);
            });

            let $cartItem = $('#cart-item-' + id);
            if ($cartItem.length) {
                $cartItem.slideUp(300);
            }
        });
    }


    renderAndOpenCart(cart) {
        this.renderCart(cart);
        this.openCart();
    }


    renderCart(cart) {
        // debugger;
        let formatedItems = this.formatItems(cart.items);
        this.elements.$cartQty.html(cart.item_count);
        this.elements.$minicartPrice.html(money(cart.total_price, this.format))
        this.elements.$itemList.html(this.itemListTemplate({items: formatedItems}));
        // debugger;
        if (this.elements.$fullCart !== undefined && this.elements.$fullCart.length) {
            this.elements.$fullCart.html(this.fullCartTemplate({items: formatedItems}));
            this.elements.$fullCartSummary.html(money(cart.total_price, this.format))
        }

    }

    refreshCart() {
        this.getCart(this.renderCart.bind(this));
    }

    toggleCart(e) {
        e.preventDefault();
        if (this.isOpened) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    forbidScroll(scrollTop, e) {
        // let targetIsCartScroll = false;
        // let $scrollBar = this.elements.$cart.find('.minicart__conent');

        // targetIsCartScroll = !!$(e.target).closest(this.elements.$cart.find('.minicart__conent')).length;

        // $(window).scrollTop(scrollTop);
        //
        // if (targetIsCartScroll) {
        //     e.stopPropagation();
        //     return;
        // }
        // console.log('forbide scroll');

        return false;
    }

    openCart() {
        if (!this.isOpened) {
            this.elements.$cart.addClass(this.classes.cartActive);
            $('html').addClass(this.classes.bodyCartActive);
            this.isOpened = true;

            $(window).on('touchmove.forbidScroll scroll.forbidScroll', this.forbidScroll.bind(this, $(window).scrollTop()));
            // this.elements.$cart.find('.minicart__conent').on('touchmove.forbidScroll scroll.forbidScroll', (e)=>{console.log('111');e.stopPropagation()});

        }
        return false;


    }

    closeCart() {
        if (this.isOpened) {
            this.elements.$cart.removeClass(this.classes.cartActive);
            $('html').removeClass(this.classes.bodyCartActive);
            this.isOpened = false;
            $(window).off('touchmove.forbidScroll scroll.forbidScroll');
            // this.elements.$cart.find('.minicart__conent').off('touchmove.forbidScroll scroll.forbidScroll');
        }
        return false;
    }
}

module.exports = Cart;

