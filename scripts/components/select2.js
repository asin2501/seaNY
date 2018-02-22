module.exports = initSelect2;

function initSelect2(element) {

    if ( $(element).length > 0 ){
        $(element).select2({
            minimumResultsForSearch: Infinity
        });
    }
}