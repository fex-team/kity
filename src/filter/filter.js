/**
 * Filter 基类
 */

define( function ( require, exports, module ) {

    var svg = require( "graphic/svg");

    return require( 'core/class' ).createClass( "Filter", {

        mixins: [ require( "filter/effectcontainer" ) ],

        constructor: function ( x, y, width, height ) {

            this.node = svg.createNode( 'filter' );

            x !== undefined && this.set( 'x', x );
            y !== undefined && this.set( 'y', y );
            width !== undefined && this.set( 'width', width );
            height !== undefined && this.set( 'height', height );

        },

        getId: function () {

            return this.id;

        },

        setId: function ( id ) {

            this.node.id = id;

            return this;

        },

        set: function ( key, value ) {

            this.node.setAttribute( key, value );

            return this;

        },

        get: function ( key ) {

            return this.node.getAttribute( key );

        },

        getNode: function () {

            return this.node;

        }

    } );

} );