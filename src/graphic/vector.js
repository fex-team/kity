define( function (require, exports, module) {
    var Vector = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
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
    Vector.verticalVector = function( p ) {
        return new Vector( p.y, -p.x );
    };
    Vector.verticalNormalize = function( p ) {
        return Vector.normalize( Vector.verticalVector(p) );
    };
    Vector.multipy = function( p, s ) {
        return new Vector( p.x * s, p.y * s );
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
    return require('core/class').createClass('Vector', {
        constructor: Vector,
        length: function() {
            return Math.sqrt( Vector.square( this ) );
        }
    });
});