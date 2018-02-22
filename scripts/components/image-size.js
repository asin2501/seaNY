module.exports = getSizedImageUrl;

function getSizedImageUrl(src, size) {
    if (size === null) {
        return src;
    }

    if (size === 'master') {
        return removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
        var prefix = src.split(match[0]);
        var suffix = match[0];

        return removeProtocol(prefix[0] + '_' + size + suffix);
    } else {
        return null;
    }
}

function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
}