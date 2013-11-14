define(function(require, exports, module) {

    return require('core/class').createClass( 'Circle', {

        base: require( 'graphic/ellipse' ),

        constructor: function( cx, cy, radius ) {

            this.callBase( cx, cy, radius, radius );

            this.rx = this.ry = this.radius = radius;

            this.update();

        },

        getRadius: function () {
            return this.radius;
        },

        setRadius: function ( radius ) {
            this.rx = this.ry = this.radius = radius;
        }

    });
});