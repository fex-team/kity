/**
 * seajs 包裹
 */

function define () {

    _global_build_.define.apply( _global_build_, arguments );

}

define( 'start', function ( require, exports, module ) {

    window.kity = {

        Rect: require( 'graphic/rect' ),
        Paper: require( 'graphic/paper' )

    };

} );

_global_build_.seajs.use( 'start' );
