/*
 * USE 功能
 */

define( function ( require, exports, module ) {

    var Svg = require( "graphic/svg" );

    return require( "core/class" ).createClass( 'Use', {

        base: require( "graphic/shape" ),

        constructor: function ( shape ) {

            var shapeId = null;

            this.callBase( 'use' );

            shapeId = shape.getId();

            if ( shapeId ) {
                this.node.setAttributeNS( Svg.xlink,'xlink:href', '#' + shapeId );
            }

        }

    } );

} );