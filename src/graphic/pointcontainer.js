/**
 * 点集合容器
 */

define( function ( require, exports, module ) {


    return require( "core/class" ).createClass( 'PointContainer', {

        constructor: function (  ) {
            this.points = this.items = [];
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