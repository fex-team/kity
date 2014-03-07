define( function (require, exports, module) {
    var Vector = require('core/class').createClass('Vector', {
        constructor: function(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        },
        length: function() {
            return Math.sqrt( Vector.square( this ) );
        }
    });

    Vector.add = function ( p, q ) {
        return new Vector( p.x + q.x, p.y + q.y );
    };
    Vector.square = function( p ) {
        return p.x * p.x + p.y * p.y;
    };
    Vector.normalize = function( p, l ) {
        if(l === undefined) {
            l = 1;
        }
        var factor = l / p.length();
        return new Vector( p.x * factor, p.y * factor );
    };
    // 顺时针
    Vector.verticalVector = function( p ) {
        return new Vector( p.y, -p.x );
    };
    Vector.verticalNormalize = function( p, l ) {
        return Vector.normalize( Vector.verticalVector(p, l) );
    };
    Vector.multipy = function( p, s ) {
        return new Vector( p.x * s, p.y * s );
    };
    Vector.reverse = function( p ) {
        return Vector.multipy(p, -1);
    };
    Vector.dot = function ( p, q ) {
        return p.x * q.x + p.y * q.y;
    };
    Vector.minus = function ( p, q ) {
        return new Vector( p.x - q.x, p.y - q.y );
    };
    // p 在 q 上的投影
    Vector.projection = function( p, q ) {
        var factor = Vector.dot( p, q ) / Vector.square( q );
        return Vector.multipy( q, factor );
    };
    // from p1 to p2
    Vector.fromPoints = function( p1, p2 ) {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    };
    Vector.fromPolar = function( d, a, isRad ) {
        if(isRad !== true) {
            a = a * Math.PI / 180;
        }
        return new Vector( d * Math.cos(a), d * Math.sin(a) );
    };
    return Vector;
});