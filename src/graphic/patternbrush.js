define(function (require, exports, module) {
    var Brush = require('graphic/brush');
    return require('core/class').createClass('ImageBrush', {
        base: Brush,
        constructor: function (url) {
            this.setUrl(url);
        },
        setUrl: function (url) {

        }
    });
});