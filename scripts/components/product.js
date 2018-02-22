/**
 * Created by 2501 on 30.05.2017.
 */


let handleize = require('./handleize');

let formatMoney = require('./format-money');

class ProductSelector {
    constructor(product, productOptionsNames, $sizeSelect, $colorsSelects) {
        this.elements = {
            addToCart: $('.js-add-to-cart', '.full-product'),
            price: $('#price'),
            comparePrice: $('#c-price'),
            addToCartErrorMessage: $('.full-product__error-message'),
            qty: $('.js-qty-select')
        };

        let theProduct = this;
        this.product = product;

        // We bring everything to lowercase so that there are no problems with comparing
        this.product.variants = this.product.variants.map((item) => {
            item.option1 = item.option1 ? handleize(item.option1) : undefined;
            item.option2 = item.option2 ? handleize(item.option2) : undefined;
            item.option3 = item.option3 ? handleize(item.option3) : undefined;

            item.options = item.options.map((item) => {
                return handleize(item);
            });

            return item;
        });

        this.$sizeSelect = $sizeSelect;
        this.$colorsSelects = $colorsSelects.length > 0 ? $colorsSelects : false;
        this.productOptionsNames = productOptionsNames;

        this.dictionary = this.parseVariants(this.product.variants);
        this.selectedOptions = [];
        this.qty = 1;

        if(product.variants.length === 1){
            this.currentVariant = product.variants[0];
        }

        // base classes
        this.classes = {
            optionItem: 'option__item',
            optionActive: 'option__item--active',
            disabledClass: 'option__item--disabled'
        };

        // add desctop size handler, fire when user select size
        this.$sizeSelect.find('.' + theProduct.classes.optionItem).click(function () {
            if (!$(this).hasClass(theProduct.classes.disabledClass)) {
                theProduct.optionClickHandler(0, $(this).attr('data-value'));
            }
        });

        // if exist option color
        if (this.$colorsSelects) {
            // add color handler, fire when user select color
            this.$colorsSelects.find('.' + theProduct.classes.optionItem).click(function () {
                if (!$(this).hasClass(theProduct.classes.disabledClass)) {
                    theProduct.optionClickHandler(1, $(this).attr('data-value'));
                }
            });
        }

        // disabling empty values
        this.setStartOptionValue(this.dictionary);


        // fires when addToCart click
        this.elements.addToCart.click(this.addToCartClickHandler.bind(this));
    }

    addToCartClickHandler() {
        if (this.currentVariant) {
            cart.add(this.currentVariant.id, +this.elements.qty.val());
            this.elements.addToCartErrorMessage.hide();
        } else {
            this.elements.addToCartErrorMessage.show();
        }
    }

    // disabling empty values
    setStartOptionValue(dictionary) {
        let theProduct = this;

        this.$sizeSelect.find('.' + this.classes.optionItem).each(function () {
            let value = $(this).attr('data-value');
            if (dictionary[value] === undefined) {
                $(this).addClass(theProduct.classes.disabledClass);
            }
        });
    }

    // change price when selected another variant
    refreshCurrentVariantData() {
        if (this.currentVariant) {
            this.elements.price.html(formatMoney(this.currentVariant.price));
        }
    }

    // added 'className' to 'option' which not in 'values'
    disabledOptions($options, values, className) {
        $options.removeClass(className);
        if (values) {
            $options.each(function () {
                if (values.indexOf($(this).attr('data-value')) === -1) {
                    $(this).addClass(className);
                }
            });
        }
    }

    // render actual state from 'newOptions'
    changeSelectsState(newOptions) {

        this.$sizeSelect.find('.' + this.classes.optionActive).removeClass(this.classes.optionActive);

        newOptions.forEach((item, i) => {
            if (item !== undefined) {
                switch (i) {
                    case 0:
                        this.$sizeSelect.find('#option-' + item).addClass(this.classes.optionActive);
                        break;
                    case 1:
                        this.$colorsSelects.find('.' + this.classes.optionActive).removeClass(this.classes.optionActive);
                        this.$colorsSelects.find('#option-' + item).addClass(this.classes.optionActive);
                        this.disabledOptions(this.$colorsSelects.find('.' + this.classes.optionItem), this.dictionary[newOptions[0]], this.classes.disabledClass);
                        break;
                }
            }
        });
    }

    refreshSelectsState() {
        this.changeSelectsState(this.selectedOptions);
    }

    // search variant in variant-list which corresponds to the selected options
    getVariant(options) {
        let variants = this.product.variants;

        for (let i = 0; i < variants.length; i++) {

            let variant = variants[i];
            let checkCounter = 0;

            for (let c = 0; c < options.length; c++) {
                if (options[c] == variant.options[c]) {
                    checkCounter++;
                }
            }

            if (checkCounter === options.length) {
                return variant;
            }
        }
    }

    // fire when user select some option, change all interface from selected state
    optionClickHandler(optionIndex, optionValue) {
        this.selectedOptions[optionIndex] = optionValue;

        if (optionValue === '') {
            this.selectedOptions[optionIndex] = '';
        } else {
            if (optionIndex === 0 && this.dictionary[optionValue].length === 1) {
                let availableColor = this.dictionary[optionValue][0];
                this.$sizeSelect.find('#option-' + availableColor).click();

                // return;
                this.selectedOptions[1] = this.dictionary[optionValue][0];

                //click to option

            } else if (optionIndex === 0 && this.dictionary[optionValue].indexOf(this.selectedOptions[1]) === -1) {
                this.selectedOptions[1] = undefined;
            }
        }

        this.currentVariant = this.getVariant(this.selectedOptions);

        this.refreshCurrentVariantData();
        this.refreshSelectsState();
    }

    //retun dictionary when key - option1 - value array of the options that are associated with it
    parseVariants(productVariants) {
        let parsedVariants = {};

        productVariants.forEach(function (variant) {
            if (variant.inventory_quantity !== 0) {
                if (parsedVariants[variant['option1']] !== undefined) {
                    parsedVariants[variant['option1']].push(variant['option2']);
                } else {
                    parsedVariants[variant['option1']] = [variant['option2']];
                }
            }
        });

        return parsedVariants;
    }
}

module.exports = ProductSelector;