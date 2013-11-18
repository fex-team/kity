/*
 * 点对象抽象
 */

define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'Point', {

        constructor: function ( x, y ) {
            this.px = x;
            this.py = y;
        },

        setPoint: function ( x, y ) {
            this.px = x;
            this.py = y;
            return this;
        },

        getPoint: function () {
            return {
                x: this.px,
                y: this.py
            };
        },

        setX: function ( x ) {
            this.px = x;
            return this;
        },

        getX: function () {
            return this.px;
        },

        setY: function ( y ) {
            this.py = y;
            return this;
        },

        getY: function () {
            return this.py;
        }

    } );

} );
