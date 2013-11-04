define(function(require, exports, module) {
    var utils = require('core/utils');


    // 注意，合并的结果是先执行m2，再执行m1的结果
    function mergeMatrixData(m2, m1) {
        return {
            a: m1.a * m2.a + m1.c * m2.b,
            b: m1.b * m2.a + m1.d * m2.b,
            c: m1.a * m2.c + m1.c * m2.d,
            d: m1.b * m2.c + m1.d * m2.d,
            e: m1.a * m2.e + m1.c * m2.f + m1.e,
            f: m1.b * m2.e + m1.d * m2.f + m1.f
        };
    }

    function Matrix() {
        if (arguments.length) {
            this.setMatrix.apply(this, arguments);
        }
        else {
            this.setMatrix(1, 0, 0, 1, 0, 0);
        }
    }

    require('core/class').createClass('Matrix', {
        constructor: Matrix,

        addTranslate: function(x, y) {
            this.m = mergeMatrixData(this.m, {
                a: 1, c: 0, e: x,
                b: 0, d: 1, f: y
            });
        },

        addRotate: function( deg ) {
            var rad = deg * Math.PI / 180;
            var sin = Math.sin(rad), cos = Math.cos(rad);
            this.m = mergeMatrixData(this.m, {
                a:  cos, c: -sin, e: 0,
                b: -sin, d:  cos, f: 0
            });
        },

        addScale: function( sx, sy ) {
            if( sy === undefined ) {
                sy = sx;
            }
            this.m = mergeMatrixData(this.m, {
                a: sx, c:  0, e: 0,
                b: 0,  d: sy, f: 0
            });
        },

        addSkew: function( degX, degY ) {
            if(degY === undefined) {
                degY = degX;
            }
            var tx = Math.tan( degX ), ty = Math.tan( degY );
            this.m = mergeMatrixData(this.m, {
                a: 1 + tx * ty, c: tx, e: 0,
                b: ty,          d: 1,  f: 0
            });
        },

        setMatrix: function(a, b, c, d, e, f) {
            if(arguments.length === 1) {
                this.m = utils.clone( arguments[0] );
            } else {
                this.m = { a: a, b: b, c: c, d: d, e: e, f: f };
            }
        },

        getMatrix: function() {
            return utils.clone(this.m);
        },

        mergeMatrix: function(matrix) {
            return new Matrix( mergeMatrixData(this.m, matrix.m) );
        }
    });
});