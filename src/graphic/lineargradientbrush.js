define(function (require, exports, module) {

    var className = 'LinearGradientBrush';
    var svg = require('graphic/svg');
    var GradientBrush = require('graphic/gradientbrush');

    return require('core/class').createClass(className, {
        base: GradientBrush,

        constructor: function () {
            this.callBase('linearGradient');
            this.setStartPosition(0, 0);
            this.setEndPosition(1, 0);
        },

        setStartPosition: function (px, py) {
            this.sp = [px, py];
            return this;
        },

        setEndPosition: function (px, py) {
            this.ep = [px, py];
            return this;
        },

        getStartPosition: function () {
            return {
                x: this.sp[0],
                y: this.sp[1]
            };
        },

        getEndPosition: function () {
            return {
                x: this.ep[0],
                y: this.ep[1]
            };
        },

        /* implement */
        renderNode: function () {
            this.callBase();

            var p1 = this.getStartPosition(),
                p2 = this.getEndPosition();
            this.node.setAttribute('x1', p1.x);
            this.node.setAttribute('y1', p1.y);
            this.node.setAttribute('x2', p2.x);
            this.node.setAttribute('y2', p2.y);
        }
    });
});