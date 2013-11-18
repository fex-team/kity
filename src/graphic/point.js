/*
 * 点对象抽象
 */

define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'Point', {

        constructor: function ( x, y ) {
            this.x = x;
            this.y = y;
        },

        setPoint: function ( x, y ) {
            this.x = x;
            this.y = y;
            return this;
        },

        getPoint: function () {
            return {
                x: this.x,
                y: this.y
            };
        },

        setX: function ( x ) {
            this.x = x;
            return this;
        },

        getX: function () {
            return this.x;
        },

        setY: function ( y ) {
            this.y = y;
            return this;
        },

        getY: function () {
            return this.y;
        }

    } );

} );
