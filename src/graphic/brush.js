define( function ( require, exports, module ) {

    var Brush = require( 'core/class' ).createClass( 'Brush', {
        constructor: function () {

        },
        getType: function () {
            throw new Error( 'abstract method call error' );
        }
    } );
    return Brush;
} );