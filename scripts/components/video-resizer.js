/**
 * Created by 2501 on 30.05.2017.
 */
module.exports = function (videos, parentSlider, ratio) {
    if (videos === undefined || parent === undefined) {
        return;
    }
    ratio = ratio || 0.5275;
    let reverseRatio = 1 / ratio;

    setVideowidth(parentSlider, videos);

    // window.addEventListener("resize", ()=>{setVideowidth(parentSlider, videos)});
    // console.log(parentSlider);

    $(parentSlider).on('setPosition', () => {
        setVideowidth(parentSlider, videos)
    });


    function setVideowidth(parent, videos) {
        // console.log(parent);
        let width = reverseRatio * +parent.clientHeight;

        // console.log(reverseRatio, parent.clientHeight);
        videos.forEach(function (video) {
            video.style.width = width + 'px';
        });
    }
}