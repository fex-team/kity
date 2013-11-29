/**
 * 蒙板
 */

define( function ( require, exports, module ) {

    return require( "core/class" ).createClass( "Mask", {

        base: require( "graphic/shape" ),
        mixins: [ require( "graphic/shapecontainer" ) ],

        constructor: function () {

            this.callBase( 'mask' );

        },

        mask: function ( shape ) {

            shape.getNode().setAttribute( "mask", "url(#"+ this.getId() +")" );
            return this;

        }

    } );

} );

