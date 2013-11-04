define(function(require, exports, module) {
    var Color = require('core/class').createClass( 'Color', {
        constructor: function(value) {
            this.value = value;
        },
        toString: function() {
            return this.value;
        }
    });
    Color.parse = function(value) {
        return new Color(value);
    };
    return Color;
});