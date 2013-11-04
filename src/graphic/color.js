define(function(require, exports, module) {
    // 如果冲突删除本段，这是个桩
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