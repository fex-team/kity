/**
 * 点集合容器
 */

define( function ( require, exports, module ) {


    return require( "core/class" ).createClass( 'PointContainer', {

        base: require( "graphic/container" ),

        constructor: function (  ) {
            this.points = this.items = [];
            this.callBase();
        },

        addPoint: function ( point, pos ) {

            return this.addItem( point, pos );

        },

        appendPoint: function ( point ) {

            return this.appendItem( point );

        },

        removePoint: function ( pos ) {

            return this.removeItem( pos );

        }

    } );

} );