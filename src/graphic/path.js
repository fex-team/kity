define( function ( require, exports, module ) {
    var Utils = require( 'core/utils' );
    var createClass = require( 'core/class' ).createClass;
    var Shape = require( 'graphic/shape' );
    var svg = require( 'graphic/svg' );
    var config = require( 'core/config' );

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
        arcTo: function ( rx, ry, xr, laf, sf, x, y ) {
            return this.appendData( [ 'A', rx, ry, xr, laf, sf, x, y ] );
        },
        arcBy: function ( rx, ry, xr, laf, sf, dx, dy ) {
            return this.appendData( [ 'a', rx, ry, xr, laf, sf, dx, dy ] );
        },
        carcTo: function ( r, x, y, laf, sf ) {
            return this.arcTo( r, r, 0, laf || 0, sf || 0, x, y );
        },
        carcBy: function ( r, dx, dy, laf, sf ) {
            return this.arcBy( r, r, 0, laf || 0, sf || 0, dx, dy );
        },
        bezierTo: function ( x1, y1, x2, y2, x, y ) {
            return this.appendData( [ 'C', x1, y1, x2, y2, x, y ] );
        },
        bezierBy: function ( dx1, dy1, dx2, dy2, dx, dy ) {
            return this.appendData( [ 'c', dx1, dy1, dx2, dy2, dx, dy ] );
        },
        close: function () {
            return this.appendData( [ 'z' ] );
        },
        clear: function () {
            this.__clear = true;
            this.path.setPathData( 'M 0 0' );
            return this;
        }
    } );

    function flatten( arr ) {
        var result = [],
            length = arr.length;
        for ( var i = 0; i < length; i++ ) {
            if ( arr[ i ] instanceof Array ) {
                result = result.concat( flatten( arr[ i ] ) );
            } else {
                result.push( arr[ i ] );
            }
        }
        return result;
    }

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
            var path = this;

            if ( config.debug ) {

                path.node.setAttribute( 'd', data );

                this.trigger( 'shapeupdate', {
                    type: 'pathdata'
                } );
            } else {
                // lazy dump data attribute
                clearTimeout( this.lazyDumpId );
                this.lazyDumpId = setTimeout( function () {
                    path.node.setAttribute( 'd', data );
                    this.trigger( 'shapeupdate', {
                        type: 'pathdata'
                    } );
                } );
            }
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