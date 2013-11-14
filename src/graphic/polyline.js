define( function ( require, exports, module ) {

    return require( 'core/class' ).createClass( 'Polyline', {

        base: require( 'graphic/pointshape' ),

        constructor: function ( points ) {

            this.callBase( points );

        }

    } );
} );
