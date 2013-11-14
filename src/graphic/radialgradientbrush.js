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
            this.c = {
                x: cx,
                y: cy
            };
        },

        getCenter: function () {
            return this.c;
        },

        setFocal: function (fx, fy) {
            this.f = {
                x: fx,
                y: fy
            };
        },

        getFocal: function () {
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
                f = this.getFocal(),
                r = this.getRadius();
            this.node.setAttribute('cx', c.x);
            this.node.setAttribute('cy', c.y);
            this.node.setAttribute('fx', f.x);
            this.node.setAttribute('fy', f.y);
            this.node.setAttribute('r', r);
        }
    });
});