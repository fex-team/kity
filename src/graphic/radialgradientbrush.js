define(function (require, exports, module) {

    var GradientBrush = require('gradient/gradientbrush');

    return require('core/class').createClass('RadialGradientBrush', {
        base: GradientBrush,

        constructor: function () {
            this.callBase('radialGradient');
            this.setCenter(0.5, 0.5);
            this.setFacal(0.5, 0.5);
            this.setRadius(0.5);
        },

        setCenter: function (cx, cy) {
            this.c = {
                x: cx,
                y: cy
            };
        },

        getCenter: function () {
            return this.c;
        },

        setFacal: function (fx, fy) {
            this.f = {
                x: fx,
                y: fy
            };
        },

        getFacal: function () {
            return this.f;
        },

        setRadius: function (r) {
            this.r = r;
        },

        getRadius: function () {
            return this.r;
        },

        // implement
        renderNode: function () {
            this.callBase();
            var c = this.getCenter(),
                f = this.getFacal(),
                r = this.getRadius();
            this.node.setAttribute('cx', c.x);
            this.node.setAttribute('cy', c.y);
            this.node.setAttribute('fx', f.x);
            this.node.setAttribute('fy', f.y);
            this.node.setAttribute('r', r);
        }
    });
});