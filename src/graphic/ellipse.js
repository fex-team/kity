define(function(require, exports, module) {

    var Utils = require( 'core/utils' );

    return require('core/class').createClass( 'Ellipse', {

        base: require( 'graphic/path' ),

        constructor: function( cx, cy, rx, ry ) {

            this.callBase();

            this.cx = cx;
            this.cy = cy;
            this.rx = rx;
            this.ry = ry;

            //防止createClass构造原型链时报错
            if ( arguments.length > 0 ) {
                this.update();
            }

        },

        update: function () {

            var pathData = [

                'M ' + ( this.cx + this.rx ) + ' ' + this.cy,
                ' A ' + this.rx + ' ' + this.ry,
                ' 0 1 1 ' + ( this.cx - this.rx ) + ' ' + this.cy,
                ' A ' + this.rx + ' ' + this.ry,
                ' 0 1 1 ' + ( this.cx + this.rx ) + ' ' + this.cy,
                ' Z'

            ];

            this.setPathData( pathData.join( "" ) );

        },

        getRadius: function () {
            return {
                x: this.rx,
                y: this.ry
            };
        },

        getRadiusX: function () {
            return this.rx;
        },

        getRadiusY: function () {
            return this.ry;
        },

        getCenter: function () {
            return {
                x: this.cx,
                y: this.cy
            };
        },

        getCenterX: function () {
            return this.cx;
        },

        getCenterY: function () {
            return this.cy;
        },

        setRadius: function ( rx, ry ) {
            this.rx = rx;
            this.ry = ry;
            this.update();
        },

        setRadiusX: function ( rx ) {
            this.rx = rx;
            this.update();
        },

        setRadiusY: function ( ry ) {
            this.ry = ry;
            this.update();
        },

        setCenter: function ( cx, cy ) {
            this.cx = cx;
            this.cy = cy;
            this.update();
        },

        setCenterX: function ( cx ) {
            this.cx = cx;
            this.update();
        },

        setCenterY: function ( cy ) {
            this.cy = cy;
            this.update();
        }


    });
});