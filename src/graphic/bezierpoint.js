/**
 * 贝塞尔点
 */

define( function ( require, exports, module ) {

    var BezierPointUtil = {

        updateForwardPoint: function ( bezierPoint ) {

            var point = bezierPoint.point,
                backward = bezierPoint.backward,
                forward = BezierPointUtil.updateControlPoint( point.getX(), point.getY(), backward.getX(), backward.getY() );

            bezierPoint.forward = {
                x: forward.x,
                y: forward.y
            };

        },

        updateBackwardPoint: function ( bezierPoint ) {

            var point = bezierPoint.point,
                forward = bezierPoint.forward,
                backward = BezierPointUtil.updateControlPoint( point.getX(), point.getY(), forward.getX(), forward.getY() );

            bezierPoint.backward = {
                x: backward.x,
                y: backward.y
            };

        },

        /*
         * 根据传递进来的顶点坐标和控制点坐标， 计算另一个控制点坐标
         * @param x 顶点X坐标
         * @param y 顶点Y坐标
         * @param cx 控制点X坐标
         * @param cy 控制点Y坐标
         * @return 另一个控制点坐标的PlainObject对象
         */
        updateControlPoint: function ( x, y, cx, cy ) {

            return {
                x: 2*x - cx,
                y: 2*y - cy
            };

        }

        },
        Point = require( 'graphic/point' );

    return require( "core/class" ).createClass( 'BezierPoint', {

        constructor: function ( x, y, isSmooth ) {

            //顶点
            this.point = new Point( x, y );

            //控制点
            this.forward = new Point( x, y );

            this.backward = new Point( x, y );

            //是否平滑
            this.smooth = isSmooth === undefined ? true : !!isSmooth;

        },

        setPoint: function ( x, y ) {

            this.point.setPoint( x, y );

            this.update();

            return this;

        },

        setForward: function ( x, y ) {

            this.forward.setPoint( x, y );

            //更新后置点
            this.smooth && BezierPointUtil.updateBackwardPoint( this );

            this.update();

            return this;

        },

        setBackward: function ( x, y ) {

            this.backward.setPoint( x, y );

            //更新前置点
            this.smooth && BezierPointUtil.updateForwardPoint( this );

            this.update();

            return this;

        },

        setSmooth: function ( isSmooth ) {

            this.smooth = !!isSmooth;

            return this;

        },

        getPoint: function () {

            return {
                x: this.point.x,
                y: this.point.y
            };

        },

        getForward: function () {
            return {
                x: this.forward.x,
                y: this.forward.y
            };
        },

        getBackward: function () {
            return {
                x: this.backward.x,
                y: this.backward.y
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
