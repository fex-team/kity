define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'Polyline', {

        base: require( 'graphic/poly' ),

        constructor: function ( points ) {

            this.callBase( points );

        }

    } );
} );
