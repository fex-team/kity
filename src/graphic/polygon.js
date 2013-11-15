define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'Polygon', {

        base: require( "graphic/pointshape" ),

        constructor: function ( points ) {

            this.callBase( points, true );

        }

    } );
} );
