/*
 * 图形上的点抽象
 */

define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'ShapePoint', {

        base: require( 'graphic/point' ),

        constructor: function ( px, py ) {

            this.callBase( px, py );

        },

        setX: function ( x ) {

            this.callBase( x );

            this.update();

            return this;

        },

        setY: function ( y ) {

            this.callBase( y );

            this.update();

            return this;
        },

        setPoint: function ( x, y ) {

            this.callBase( x, y );

            this.update();

            return this;
        },

        update: function () {

            if ( this.container && this.container.update ) {
                this.container.update();
            }
            
            return this;
        }

    } );

} );
