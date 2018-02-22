/**
 * Created by 2501 on 07.06.2017.
 */


class SocialPopup {
    constructor($popUp, containerClassName, closeBtnClassName) {
        this.$popUp = $popUp;
        let theSocialPopup = this;
        this.$popUp.find('.' + closeBtnClassName).click(this.close.bind(this));
        this.$popUp.click(function (e) {
            if ($(e.target).closest('.' + containerClassName).length) {
                return;
            } else {
                theSocialPopup.close();
            }
        });
    }

    open() {
        this.$popUp.fadeIn();
    }

    close() {
        this.$popUp.fadeOut();
    }
}


class CollectionGallery {
    constructor($popup, $galleryItems, classes = {
                    slider: 'collection-popup__slider',
                    slide: 'collection-popup__slide',
                    activeSlide: 'collection-popup__slide--active',
                    popupToggle: 'collection-popup--showed',
                    documentToggleClass: 'collection-popup-opened',
                    closeBtn: 'collection-popup__close-button',
                    currentSlide: 'collection-popup__slide--current'
                }) {
        const theCollectionGallery = this;

        let _this = this;

        this.isOpened = false;
        this.$popup = $popup;
        this.$galleryItems = $galleryItems;
        this.classes = classes;
        this.$slider = this.$popup.find('.' + classes.slider);
        this.$slides = {};
        this.currentSlide = 1;

        this.socialPopup = new SocialPopup($('#share-popup'), 'share-popup__container', 'share-popup__close');


        let sliderSettings = {
            slideWidth: 5000,
            minSlides: 3,
            wrapperClass: 'collection-popup__slide-wrapper',
            pager: false,
            touchEnabled: false,
            maxSlides: 3,
            moveSlides: 1,
            onSlideBefore: ($slideElement, oldIndex, newIndex) => {
                this.$slides.removeClass(this.classes.currentSlide);
                $slideElement.addClass(this.classes.currentSlide);
            },
            onSlideAfter: ($slideElement, oldIndex, newIndex) => {
                console.log(this);
                this.$slides.removeClass(this.classes.activeSlide);
            },
        };

        this.$slider.bxSlider(sliderSettings);

        this.$slides = this.$slider.find('.' + classes.slide);

        this.$slider.goToSlide(1);

        this.$galleryItems.each(function (i) {
            $(this).click(theCollectionGallery.goToSlideAndOpen.bind(theCollectionGallery, i));
        });

        this.$slider.on('click', '.collection-popup__slide', function () {
            if ($(this).prev().prev().hasClass(_this.classes.currentSlide)) {
                $(this).addClass(_this.classes.activeSlide);
                _this.$slider.goToNextSlide();
                $(this).addClass();
            } else if ($(this).hasClass(_this.classes.currentSlide)) {
                $(this).addClass(_this.classes.activeSlide);
                _this.$slider.goToPrevSlide();
            }
        });

        this.$popup.find('.' + classes.closeBtn).click(this.closePopUp.bind(this));

        this.$popup.find('.slick-next').click(() => {
            _this.$slider.goToNextSlide();
        });

        this.$popup.find('.slick-prev').click(() => {
            _this.$slider.goToPrevSlide();
        });

        // this.$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //     theCollectionGallery.$slider.addClass('collection-popup__slider--changing');
        // });

        // this.$slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
        //     theCollectionGallery.$slider.removeClass('collection-popup__slider--changing').find('.active-slide').removeClass('active-slide');
        // });

        this.$popup.on('click', '.collection-popup__share-button', function () {

            $(this).parent('.collection-popup__footer').toggleClass('collection-popup__footer--social-opened');
            theCollectionGallery.socialPopup.open();
            return false;
        });
    }

    goToSlideAndOpen(slideNum) {
        const theCollectionGallery = this;
        this.$slider.goToSlide(slideNum - 1);
        setTimeout(function () {
            theCollectionGallery.openPopup();
        }, 100);
        return false;
    }

    openPopup() {
        this.$popup.css('z-index', 5);
        this.$popup.addClass(this.classes.popupToggle);
        // this.$slider.slick('setPosition');
        this.isOpened = true;

        $('html').addClass('overflow-hidden');
        return false;
    }

    closePopUp() {
        this.$popup.removeClass(this.classes.popupToggle);
        setTimeout(() => {
            this.$popup.css('z-index', -1);
        }, 600);
        this.isOpened = false;
        $('html').removeClass('overflow-hidden');
        return false;
    }
}

module.exports = CollectionGallery;