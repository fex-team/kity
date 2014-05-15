define(function(require, exports, module) {

    return require('core/class').createClass('Circle', {

        base: require('graphic/ellipse'),

        constructor: function(radius, cx, cy) {
            this.callBase(radius, radius, cx, cy);
        },

        getRadius: function() {
            return this.getRadiusX();
        },

        setRadius: function(radius) {
            return this.callBase(radius, radius);
        }

    });
});