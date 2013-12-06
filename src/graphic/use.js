/*
 * USE 功能
 */

define( function ( require, exports, module ) {

    var Svg = require( "graphic/svg" );
    var Class = require( "core/class" );

    var Use = Class.createClass( 'Use', {

        base: require( "graphic/shape" ),

        constructor: function ( shape ) {

            var shapeId = null;

            this.callBase( 'use' );

            shapeId = shape.getId();

            if ( shapeId ) {
                this.node.setAttributeNS( Svg.xlink, 'xlink:href', '#' + shapeId );
            }

            // by techird
            // 作为 Use 的图形，如果没有 fill 和 stroke，移除默认的 'none' 值，用于 Use 覆盖
            if ( shape.node.getAttribute( 'fill' ) === 'none' ) {
                shape.node.removeAttribute( 'fill' );
            }
            if ( shape.node.getAttribute( 'stroke' ) === 'none' ) {
                shape.node.removeAttribute( 'stroke' );
            }

        }

    } );

    var Shape = require( 'graphic/shape' );
    Class.extendClass( Shape, {
        // fast-use
        use: function () {
            return new Use(this);
        }
    } );

    return Use;

} );