define( function ( require, exports, module ) {
    var Utils = require( 'core/utils' );
    var createClass = require( 'core/class' ).createClass;
    var Shape = require( 'graphic/shape' );
    var svg = require( 'graphic/svg' );

    var PathDrawer = createClass( 'PathDrawer', {
        constructor: function ( path ) {
            this.path = path;
            this.__clear = false;
        },
        appendData: function ( data ) {
            var originData = this.path.getPathData();
            if ( this.__clear ) {
                originData = '';
                this.__clear = false;
            }
            if ( originData ) {
                this.path.setPathData( originData + ' ' + data.join( ' ' ) );
            } else {
                this.path.setPathData( data.join( ' ' ) );
            }
            return this;
        },
        moveTo: function ( x, y ) {
            return this.appendData( [ 'M', x, y ] );
        },
        moveBy: function ( dx, dy ) {
            return this.appendData( [ 'm', dx, dy ] );
        },
        lineTo: function ( x, y ) {
            return this.appendData( [ 'L', x, y ] );
        },
        lineBy: function ( dx, dy ) {
            return this.appendData( [ 'l', dx, dy ] );
        },
        arcTo: function( rx, ry, xr, laf, sf, x, y ) {
            return this.appendData( ['A', rx, ry, xr, laf, sf, x, y] );
        },
        arcBy: function( rx, ry, xr, laf, sf, dx, dy) {
            return this.appendData( ['a', rx, ry, xr, laf, sf, dx, dy] );
        },
        carcTo: function( r, x, y, laf, sf ) {
            return this.arcTo( r, r, 0, laf || 0, sf || 0, x, y );
        },
        carcBy: function( r, dx, dy, laf, sf ) {
            return this.arcBy( r, r, 0, laf || 0, sf || 0, dx, dy );
        },
        besierTo: function ( x1, y1, x2, y2, x, y ) {
            return this.appendData( [ 'C', x1, y1, x2, y2, x, y ] );
        },
        besierBy: function ( dx1, dy1, dx2, dy2, dx, dy ) {
            return this.appendData( [ 'c', dx1, dy1, dx2, dy2, dx, dy ] );
        },
        close: function () {
            return this.appendData( [ 'z' ] );
        },
        clear: function() {
            this.__clear = true;
            return this;
        }
    } );

    return createClass( 'Path', {
        base: Shape,
        constructor: function ( data ) {
            this.callBase( 'path' );
            this.setPathData( data );
            this.node.setAttribute( 'fill', svg.defaults.fill );
            this.node.setAttribute( 'stroke', svg.defaults.stroke );
        },
        setPathData: function ( data ) {
            if ( data ) {
                this.node.setAttribute( 'd', data );
            }
        },
        getPathData: function () {
            return this.node.getAttribute( 'd' ) || '';
        },
        getDrawer: function () {
            return new PathDrawer( this );
        },
        isClosed: function () {
            var data = this.getPathData();
            return !!~data.indexOf( 'z' ) || !! ~data.indexOf( 'Z' );
        }
    } );
} );