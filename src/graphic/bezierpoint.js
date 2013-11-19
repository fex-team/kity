/**
 * 贝塞尔点
 */

define( function ( require, exports, module ) {

    var ShapePoint = require( 'graphic/shapepoint' );
    var Vector = require( 'graphic/vector' );

    return require( "core/class" ).createClass( 'BezierPoint', {

        constructor: function ( x, y, isSmooth ) {

            //顶点
            this.point = new ShapePoint( x, y );

            //控制点
            this.forward = new ShapePoint( x, y );
            this.backward = new ShapePoint( x, y );

            //是否平滑
            this.setSmooth( (isSmooth === undefined) || isSmooth);

        },

        setPoint: function ( x, y ) {

            this.point.setPoint( x, y );

            this.update();

            return this;

        },

        setForward: function ( x, y ) {

            this.forward.setPoint( x, y );

            this.fset = true;

            //更新后置点
            if(this.smooth) {
                this.updateAnother(this.forward, this.backward);
            }
            this.update();
            return this;

        },

        setBackward: function ( x, y ) {

            this.backward.setPoint( x, y );

            this.bset = true;

            //更新前置点
            if(this.smooth) {
                this.updateAnother(this.backward, this.forward);
            }

            this.update();
            return this;

        },

        sameLength: function() {
            return !this.bset || !this.fset;
        },

        updateAnother: function(p, q) {
            var v = this.getPoint(),
                pv = Vector.fromPoints(p.getPoint(), v),
                vq = Vector.fromPoints(v, q.getPoint());
            vq = Vector.normalize(pv, this.sameLength() ? pv.length() : vq.length());
            q.setPoint(v.x + vq.x, v.y + vq.y);
        },

        getVertex: function() {
            return {
                x: this.getPoint().x,
                y: this.getPoint().y,
                f: this.getForward(),
                b: this.getBackward()
            };
        },

        setSmooth: function ( isSmooth ) {

            this.smooth = !!isSmooth;

            return this;

        },

        getPoint: function () {

            return {
                x: this.point.getX(),
                y: this.point.getY()
            };

        },

        getForward: function () {

            return {
                x: this.forward.getX(),
                y: this.forward.getY()
            };

        },

        getBackward: function () {

            return {
                x: this.backward.getX(),
                y: this.backward.getY()
            };

        },

        isSmooth: function () {
            return this.smooth;
        },

        update: function () {

            if ( !this.container ) {
                return this;
            }

            this.container.update();

        }

    } );

} );
