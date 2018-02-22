let Player = require('@vimeo/player');

module.exports = initSliderBanner;

function initSliderBanner() {
    let $sliders = $('.banner-slider__slider');
    let $firstSlider = $sliders.eq(0);
    let player;
    let $player = $('#hero-player');
    let speed = $firstSlider.attr('data-speed');
    let autoplay = $firstSlider.attr('data-autoplay');


    let sliderSettings = {
        slidesToShow: 1,
        fade: true,
        speed,
        autoplay:!!Number(autoplay),
        autoplaySpeed: autoplay,
        arrows: false,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: true,
                adaptiveHeight: true
            }
        }]
    };

    if ($sliders.length == 0) {
        return
    }

    $sliders.slick(sliderSettings);

    if ($player.length > 0) {
        player = new Player($player);
        player.play();
        player.setVolume(0);
        player.setLoop(true);
    }

}