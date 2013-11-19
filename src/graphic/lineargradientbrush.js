define(function (require, exports, module) {

    var className = 'LinearGradientBrush';
    var svg = require('graphic/svg');
    var GradientBrush = require('graphic/gradientbrush');

    return require('core/class').createClass(className, {
        base: GradientBrush,

        constructor: function (builder) {
            this.callBase('linearGradient');
            this.setStartPosition(0, 0);
            this.setEndPosition(1, 0);
            if(typeof(builder) == 'function') {
                builder.call(this, this);
            }
        },

        setStartPosition: function (px, py) {
            this.node.setAttribute('x1', px);
            this.node.setAttribute('y1', py);
            return this;
        },

        setEndPosition: function (px, py) {
            this.node.setAttribute('x2', px);
            this.node.setAttribute('y2', py);
            return this;
        },

        getStartPosition: function () {
            return {
                x: +this.node.getAttribute('x1'),
                y: +this.node.getAttribute('y1')
            };
        },

        getEndPosition: function () {
            return {
                x: +this.node.getAttribute('x2'),
                y: +this.node.getAttribute('y2')
            };
        }
    });
});