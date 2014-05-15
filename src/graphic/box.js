define(function(require, exports, module) {
    var Box = require('core/class').createClass('Box', {

        constructor: function(x, y, width, height) {
            var box = arguments[0];
            if (box && typeof(box) === 'object') {
                x = box.x;
                y = box.y;
                width = box.width;
                height = box.height;
            }
            if (width < 0) {
                x -= (width = -width);
            }
            if (height < 0) {
                y -= (height = -height);
            }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },

        getLeft: function() {
            return this.x;
        },

        getRight: function() {
            return this.x + this.width;
        },

        getTop: function() {
            return this.y;
        },

        getBottom: function() {
            return this.y + this.height;
        },

        getRangeX: function() {
            return [this.x, this.x + this.width];
        },

        getRangeY: function() {
            return [this.y, this.y + this.height];
        },

        merge: function(another) {
            var xMin = Math.min(this.x, another.x),
                xMax = Math.max(this.x + this.width, another.x + another.width),
                yMin = Math.min(this.y, another.y),
                yMax = Math.max(this.y + this.height, another.y + another.height);
            return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
        },

        valueOf: function() {
            return [this.x, this.y, this.width, this.height];
        },

        toString: function() {
            return this.valueOf().join(' ');
        }
    });

    return Box;
});