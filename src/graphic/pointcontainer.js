/**
 * 点集合容器
 */

define( function ( require, exports, module ) {


    return require( "core/class" ).createClass( 'PointContainer', {

        base: require( "graphic/container" ),

        constructor: function (  ) {
            this.callBase();
        },

        addPoint: function ( point, pos ) {

            return this.addItem( point, pos );

        },

        getPoints: function() {
            return this.getItems();
        },

        appendPoint: function ( point ) {

            return this.addPoint( point );

        },

        removePoint: function ( pos ) {

            return this.removeItem( pos );

        }

    } );

} );