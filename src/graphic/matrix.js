define( function ( require, exports, module ) {
    var utils = require( 'core/utils' );
    var mPattern = /matrix\((.+)\)/i;
    var Vector = require( 'graphic/vector' );

    // 注意，合并的结果是先执行m2，再执行m1的结果
    function mergeMatrixData( m2, m1 ) {
        return {
            a: m1.a * m2.a + m1.c * m2.b,
            b: m1.b * m2.a + m1.d * m2.b,
            c: m1.a * m2.c + m1.c * m2.d,
            d: m1.b * m2.c + m1.d * m2.d,
            e: m1.a * m2.e + m1.c * m2.f + m1.e,
            f: m1.b * m2.e + m1.d * m2.f + m1.f
        };
    }

    function d2r( deg ) {
        return deg * Math.PI / 180;
    }

    var Matrix = require( 'core/class' ).createClass( 'Matrix', {
        constructor: function () {
            if ( arguments.length ) {
                this.setMatrix.apply( this, arguments );
            } else {
                this.setMatrix( 1, 0, 0, 1, 0, 0 );
            }
        },

        translate: function ( x, y ) {
            this.m = mergeMatrixData( this.m, {
                a: 1,
                c: 0,
                e: x,
                b: 0,
                d: 1,
                f: y
            } );
            return this;
        },

        rotate: function ( deg ) {
            var rad = d2r( deg );
            var sin = Math.sin( rad ),
                cos = Math.cos( rad );
            this.m = mergeMatrixData( this.m, {
                a: cos,
                c: -sin,
                e: 0,
                b: sin,
                d: cos,
                f: 0
            } );
            return this;
        },

        scale: function ( sx, sy ) {
            if ( sy === undefined ) {
                sy = sx;
            }
            this.m = mergeMatrixData( this.m, {
                a: sx,
                c: 0,
                e: 0,
                b: 0,
                d: sy,
                f: 0
            } );
            return this;
        },

        skew: function ( degX, degY ) {
            if ( degY === undefined ) {
                degY = degX;
            }
            var tx = Math.tan( d2r( degX ) ),
                ty = Math.tan( d2r( degY ) );
            this.m = mergeMatrixData( this.m, {
                a: 1,
                c: tx,
                e: 0,
                b: ty,
                d: 1,
                f: 0
            } );
            return this;
        },

        setMatrix: function ( a, b, c, d, e, f ) {
            if ( arguments.length === 1 ) {
                this.m = utils.clone( arguments[ 0 ] );
            } else {
                this.m = {
                    a: a,
                    b: b,
                    c: c,
                    d: d,
                    e: e,
                    f: f
                };
            }
            return this;
        },

        getMatrix: function () {
            return utils.clone( this.m );
        },

        mergeMatrix: function ( matrix ) {
            return new Matrix( mergeMatrixData( this.m, matrix.m ) );
        },

        toString: function () {
            var m = this.m;
            return 'matrix(' + [ m.a, m.b, m.c, m.d, m.e, m.f ].join( ', ' ) + ')';
        },

        transformPoint: function ( x, y ) {
            return Matrix.transformPoint( x, y, this.m );
        },

        transformBox: function( box ) {
            return Matrix.transformBox( box, this.m );
        }
    } );

    Matrix.parse = function ( str ) {
        var match;
        var f = parseFloat;
        if ( ( match = mPattern.exec( str ) ) ) {
            var values = match[ 1 ].split( ',' );
            return new Matrix( {
                a: f( values[ 0 ] ),
                b: f( values[ 1 ] ),
                c: f( values[ 2 ] ),
                d: f( values[ 3 ] ),
                e: f( values[ 4 ] ),
                f: f( values[ 5 ] )
            } );
        }
        return new Matrix();
    };

    Matrix.transformPoint = function ( x, y, m ) {
        return new Vector(
            m.a * x + m.c * y + m.e,
            m.b * x + m.d * y + m.f
        );
    };

    Matrix.transformBox = function ( box, matrix ) {
        var xMin = Number.MAX_VALUE,
            xMax = -Number.MAX_VALUE,
            yMin = Number.MAX_VALUE,
            yMax = -Number.MAX_VALUE;
        var bps = [
            [ box.x, box.y ],
            [ box.x + box.width, box.y ],
            [ box.x, box.y + box.height ],
            [ box.x + box.width, box.y + box.height ]
        ];
        var bp, rp, rps = [];
        while ( ( bp = bps.pop() ) ) {
            rp = Matrix.transformPoint( bp[ 0 ], bp[ 1 ], matrix );
            rps.push( rp );
            xMin = Math.min( xMin, rp.x );
            xMax = Math.max( xMax, rp.x );
            yMin = Math.min( yMin, rp.y );
            yMax = Math.max( yMax, rp.y );
        }
        return {
            x: xMin,
            y: yMin,
            width: xMax - xMin,
            height: yMax - yMin,
            closurePoints: rps,
            left: xMin,
            right: xMax,
            top: yMin,
            bottom: yMax
        };
    };

    return Matrix;
} );