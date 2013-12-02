/**
 * 图形裁剪
 */

define( function ( require, exports, module ) {

    return require( "core/class" ).createClass( "Clip", {

        base: require( "graphic/shape" ),
        mixins: [ require( "graphic/shapecontainer" ) ],

        constructor: function () {

            this.callBase( 'clipPath' );

        },

        clip: function ( shape ) {

            shape.getNode().setAttribute( "clip-path", "url(#"+ this.getId() +")" );
            return this;

        }

    } );

} );

