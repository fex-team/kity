/**
 * 贝塞尔点
 */

define( function ( require, exports, module ) {

    var ShapePoint = require( 'graphic/shapepoint' );
    var Vector = require( 'graphic/vector' );

    var BezierPoint = require( "core/class" ).createClass( 'BezierPoint', {

        constructor: function ( x, y, isSmooth ) {

            //顶点
            this.vertex = new ShapePoint( x, y );

            //控制点
            this.forward = new ShapePoint( x, y );
            this.backward = new ShapePoint( x, y );

            //是否平滑
            this.setSmooth( ( isSmooth === undefined ) || isSmooth);

            this.setSymReflaction(true);

        },

        clone: function () {

            var newPoint = new BezierPoint(),
                tmp = null;

            tmp = this.getPoint();
            newPoint.point = new ShapePoint( tmp.x, tmp.y, false );

            tmp = this.getForward();
            newPoint.forward = new ShapePoint( tmp.x, tmp.y );

            tmp = this.getBackward();
            newPoint.backward = new ShapePoint( tmp.x, tmp.y );

            newPoint.setSmooth( newPoint.isSmooth() );

            return newPoint;

        },

        setVertex: function ( x, y ) {

            this.vertex.setPoint( x, y );

            this.update();

            return this;

        },

        moveTo: function ( x, y ) {

            var oldForward = this.forward.getPoint(),
                oldBackward = this.backward.getPoint(),
                oldVertex = this.point.getPoint(),

                //移动距离
                distance = {
                    left: x - oldVertex.x,
                    top: y - oldVertex.y
                };

            // 更新
            this.forward.setPoint( oldForward.x + distance.left, oldForward.y + distance.top );
            this.backward.setPoint( oldBackward.x + distance.left, oldBackward.y + distance.top );
            this.point.setPoint( x, y );

            this.update();

        },

        setForward: function ( x, y ) {

            this.forward.setPoint( x, y );

            //更新后置点
            if(this.smooth) {
                this.updateAnother(this.forward, this.backward);
            }
            this.update();
            return this;

        },

        setBackward: function ( x, y ) {

            this.backward.setPoint( x, y );

            //更新前置点
            if(this.smooth) {
                this.updateAnother(this.backward, this.forward);
            }

            this.update();
            return this;

        },

        setSymReflaction: function() {
            this.symReflaction = true;
        },

        isSymReflaction: function() {
            return this.symReflaction;
        },

        updateAnother: function(p, q) {
            var v = this.getVertex(),
                pv = Vector.fromPoints(p.getPoint(), v),
                vq = Vector.fromPoints(v, q.getPoint());
            vq = Vector.normalize(pv, this.isSymReflaction() ? pv.length() : vq.length());
            q.setPoint(v.x + vq.x, v.y + vq.y);
        },

        setSmooth: function ( isSmooth ) {

            this.smooth = !!isSmooth;

            return this;

        },

        getVertex: function () {

            return {
                x: this.vertex.getX(),
                y: this.vertex.getY()
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

            //新增参数 this， 把当前引起变化的点传递过去， 以便有需要的地方可以获取到引起变化的源
            this.container.update && this.container.update( this );

        }

    } );

    return BezierPoint;

} );
