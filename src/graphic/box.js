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
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
            this.left = x;
            this.right = this.x + this.width;
            this.top = this.y;
            this.bottom = this.y + this.height;
            this.cx = x + this.width / 2;
            this.cy = y + this.height / 2;
        },

        getRangeX: function() {
            return [this.left, this.right];
        },

        getRangeY: function() {
            return [this.left, this.right];
        },

        merge: function(another) {
            var xMin = Math.min(this.x, another.x),
                xMax = Math.max(this.right, another.right),
                yMin = Math.min(this.y, another.y),
                yMax = Math.max(this.bottom, another.bottom);
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