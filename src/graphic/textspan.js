define( function ( require, exports, module ) {
    var TextContent = require( 'graphic/textcontent' );
    var Styled = require( 'graphic/styled' );
    return require( 'core/class' ).createClass( 'TextSpan', {
        base: TextContent,
        mixins: [ Styled ],
        constructor: function ( content ) {
            this.callBase( 'tspan' );
            this.setContent( content );
        }
    } );
} );