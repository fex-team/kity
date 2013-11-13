define( function ( require, exports, module ) {
    var Utils = require( 'core/utils' );
    var createClass = require( 'core/class' ).createClass;
    var Shape = require( 'graphic/shape' );
    var svg = require( 'graphic/svg' );

    var PathDrawer = createClass( 'PathDrawer', {
        constructor: function ( path ) {
            this.path = path;
        },
        appendData: function ( data ) {
            var originData = this.path.getPathData();
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
        besierTo: function ( x1, y1, x2, y2, x, y ) {
            return this.appendData( [ 'C', x1, y1, x2, y2, x, y ] );
        },
        besierBy: function ( dx1, dy1, dx2, dy2, dx, dy ) {
            return this.appendData( [ 'c', dx1, dy1, dx2, dy2, dx, dy ] );
        },
        close: function () {
            return this.appendData( [ 'z' ] );
        }
    } );
    var PathUtils = {};

    Utils.extend( PathUtils, {

        //向给定的图形添加给定的属性
        dumpAttributes: function ( shape, attrs ) {

            var node = shape.node;

            Utils.each( attrs, function ( val, key ) {

                if ( val ) {
                    node.setAttribute( key, val );
                } else {
                    node.removeAttribute( key );
                }

            } );

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
            } else {
                this.node.removeAttribute( 'd' );
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