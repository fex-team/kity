/**
 * 点集合容器
 */

define( function ( require, exports, module ) {


    return require( "core/class" ).createClass( 'PointContainer', {

        base: require( "graphic/container" ),

        constructor: function () {
            this.callBase();
        },

        addItem: function ( point, pos ) {

            this.callBase( point, pos );

            this.update();

        },

        removeItem: function ( pos ) {

            this.callBase( pos );

            this.update();

        }

    } );

} );