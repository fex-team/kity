define(function (require, exports, module) {

    var GradientBrush = require('gradient/gradientbrush');

    return require('core/class').createClass('RadialGradientBrush', {
        base: GradientBrush,

        constructor: function (paper) {
            this.callBase(paper);
            this.setCenter(0.5, 0.5);
            this.setFacal(0.5, 0.5);
            this.setRadius(0.5);
        },

        getType: function () {
            return 'RadialGradientBrush';
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
        getGradientDef: function (paper) {
            var gradient = paper.createDef('radialGradient');
            var c = this.getCenter(),
                f = this.getFacal(),
                r = this.getRadius();
            gradient.setAttribute('cx', c.x);
            gradient.setAttribute('cy', c.y);
            gradient.setAttribute('fx', f.x);
            gradient.setAttribute('fy', f.y);
            gradient.setAttribute('r', r);
            return gradient;
        }
    });
});