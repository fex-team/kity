define(function(require, exports, module) {

    var utils = require( 'core/utils' );

    return require('core/class').createClass( 'Ellipse', {

        base: require( 'graphic/path' ),

        constructor: function( cx, cy, rx, ry ) {

            this.center = {
                x: cx,
                y: cy
            };

            this.radius = {
                x: rx,
                y: ry
            }

        },

        getRadius: function () {
            return utils.extend( {}, this.radius );
        },

        getRadiusX: function () {
            return this.radius.x;
        },

        getRadiusY: function () {
            return this.radius.y;
        },

        getCenter: function () {
            return utils.extend( {}, this.center );
        },

        getCenterX: function () {
            return this.center.x;
        },

        getCenterY: function () {
            return this.center.y;
        },

        setRadius: function ( cx, cy ) {
            this.center.x = cx;
            this.center.y = cy;
        },

        setRadiusX: function ( rx ) {
            this.radius.x = rx;
        },

        setRadiusY: function ( ry ) {
            this.radius.y = ry;
        },

        setCenter: function ( cx, cy ) {
            this.center.x = cx;
            this.center.y = cy;
        },

        setCenterX: function ( cx ) {
            this.center.x = cx;
        },

        setCenterY: function ( cy ) {
            this.center.y = cy;
        }


    });
});