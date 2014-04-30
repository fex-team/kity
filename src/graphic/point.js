/*
 * 点对象抽象
 */

define( function ( require, exports, module ) {

    var Point = require( 'core/class' ).createClass( 'Point', {

        constructor: function ( x, y ) {
            this.x = x || 0;
            this.y = y || 0;
        },

        offset: function ( dx, dy ) {
            return new Point( this.x + dx, this.y + dy );
        },

        valueOf: function () {
            return [ this.x, this.y ];
        },

        toString: function () {
            return this.valueOf().join( ' ' );
        }
    } );

    Point.fromPolar = function ( radius, angle, unit ) {
        if ( unit != 'rad' ) {
            // deg to rad
            angle = angle / 180 * Math.PI;
        }
        return new Point( radius * Math.cos( angle ), radius * Math.sin( angle ) );
    };

    Point.parse = function ( unknown ) {
        if ( unknown instanceof Point ) {
            return unknown;
        }
        if ( typeof ( unknown ) == 'string' ) {
            return Point.parse( unknown.split( /\s*[\s,]\s*/ ) );
        }
        if ( '0' in unknown && '1' in unknown ) {
            return new Point( unknown[ 0 ], unknown[ 1 ] );
        }
    };

    return Point;
} );