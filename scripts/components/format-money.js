/**
 * Created by 2501 on 31.05.2017.
 */
module.exports = function (cents, format) {

    if (typeof cents === 'string') {
        cents = cents.replace('.', '');
    }
    let value = '';
    let placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    let formatString = (format ||  '${{amount}}');


    function formatWithDelimiters(number, precision, thousands, decimal) {

        thousands = thousands || ',';
        decimal = decimal || '.';

        if (isNaN(number) || number == null) {
            return 0;
        }

        number = (number / 100.0).toFixed(precision);


        let parts = number.split('.');
        let dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        let centsAmount = parts[1] ? (decimal + parts[1]) : '';
        return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
        case 'amount_no_decimals_with_space_separator':
            value = formatWithDelimiters(cents, 0, ' ');
            break;
    }

    return formatString.replace(placeholderRegex, value);
    
};