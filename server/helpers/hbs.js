const hbs = require('hbs');

// Checks if each-loop is not yet on the last object.
const ifNotLast = function(v1, v2, options) {
    if(v1 < v2-1) {
        return options.fn(this);
    }
    return options.inverse(this);
}

// Replaces js line breaks (\n) with html line breaks(<br>).
const breakLines = function(text) {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
}

module.exports = {ifNotLast, breakLines}