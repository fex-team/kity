define( function ( require, exports, module ) {
    var Utils = require( 'core/utils' );
    var createClass = require( 'core/class' ).createClass;
    var Shape = require( 'graphic/shape' );
    var svg = require( 'graphic/svg' );
    var config = require( 'core/config' );

    var slice = Array.prototype.slice,
        flatten = Utils.flatten;

    var PathDrawer = createClass( 'PathDrawer', {
        constructor: function ( path ) {
            this.segment = [];
            this.path = path;
            this.__clear = false;
        },
        getPath: function () {
            return this.path;
        },
        pushSegment: function () {
            var segment = slice.call( arguments );
            var originData = this.path.getPathData();
            if ( this.__clear ) {
                originData = '';
                this.__clear = false;
            }
            segment = flatten( segment );
            if ( originData ) {
                this.path.setPathData( originData + ' ' + segment.join( ' ' ) );
            } else {
                this.path.setPathData( segment.join( ' ' ) );
            }
            return this;
        },
        push: function ( command, args ) {
            return this.pushSegment( [ command, slice.call( args ) ] );
        },
        moveTo: function ( x, y ) {
            return this.push( 'M', arguments );
        },
        moveBy: function ( dx, dy ) {
            return this.push( 'm', arguments );
        },
        lineTo: function ( x, y ) {
            return this.push( 'L', arguments );
        },
        lineBy: function ( dx, dy ) {
            return this.push( 'k', arguments );
        },
        arcTo: function ( rx, ry, xr, laf, sf, x, y ) {
            return this.push( 'A', arguments );
        },
        arcBy: function ( rx, ry, xr, laf, sf, dx, dy ) {
            return this.push( 'a', arguments );
        },
        carcTo: function ( r, laf, sf, x, y ) {
            return this.push( 'A', [ r, r, 0 ].concat( slice.call( arguments, 1 ) ) );
        },
        carcBy: function ( r, laf, sf, dx, dy ) {
            return this.push( 'a', [ r, r, 0 ].concat( slice.call( arguments, 1 ) ) );
        },
        bezierTo: function ( x1, y1, x2, y2, x, y ) {
            return this.push( 'C', arguments );
        },
        bezierBy: function ( dx1, dy1, dx2, dy2, dx, dy ) {
            return this.push( 'c', arguments );
        },
        close: function () {
            return this.pushSegment( [ 'z' ] );
        },
        clear: function () {
            this.__clear = true;
            this.path.setPathData( 'M 0 0' );
            return this;
        }
    } );


    return createClass( 'Path', {
        base: Shape,
        constructor: function ( data ) {
            this.callBase( 'path' );
            if ( data ) {
                this.setPathData( data );
            }
            this.node.setAttribute( 'fill', svg.defaults.fill );
            this.node.setAttribute( 'stroke', svg.defaults.stroke );
        },
        setPathData: function ( data ) {
            if ( !data ) {
                return;
            }

            // add support for path segment
            if ( data instanceof Array ) {
                data = flatten( data ).join( ' ' );
            }

            this.pathdata = data;

            this.node.setAttribute( 'd', data );

            this.trigger( 'shapeupdate', {
                type: 'pathdata'
            } );

            return this;
        },
        getPathData: function () {
            return this.pathdata || '';
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