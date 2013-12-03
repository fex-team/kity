/**
 * seajs 包裹
 */

define( 'kity.start', function ( require, exports, module ) {

    window.kity = {

        Rect: require( 'graphic/rect' ),
        Paper: require( 'graphic/paper' )

    };

} );

use( 'kity.start' );
