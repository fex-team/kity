define(function (require, exports, module) {

    var GradientBrush = require('graphic/gradientbrush');

    return require('core/class').createClass('RadialGradientBrush', {
        base: GradientBrush,

        constructor: function (builder) {
            this.callBase('radialGradient');
            this.setCenter(0.5, 0.5);
            this.setFocal(0.5, 0.5);
            this.setRadius(0.5);
            if(typeof(builder) == 'function') {
                builder.call(this, this);
            }
        },

        setCenter: function (cx, cy) {
            this.node.setAttribute('cx', cx);
            this.node.setAttribute('cy', cy);
            return this;
        },

        getCenter: function () {
            return {
                x: +this.node.getAttribute('cx'),
                y: +this.node.getAttribute('cy')
            };
        },

        setFocal: function (fx, fy) {
            this.node.setAttribute('fx', fx);
            this.node.setAttribute('fy', fy);
            return this;
        },

        getFocal: function () {
            return {
                x: +this.node.getAttribute('fx'),
                y: +this.node.getAttribute('fy')
            };
        },

        setRadius: function (r) {
            this.node.setAttribute('r', r);
            return this;
        },

        getRadius: function () {
            return +this.node.getAttribute('r');
        }
    });
});