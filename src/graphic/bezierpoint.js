/**
 * 贝塞尔点
 */

define( function ( require, exports, module ) {

    var BezierPointUtil = {

        updateForwardPoint: function ( bezierPoint ) {

            var point = bezierPoint.point,
                backward = bezierPoint.backward,
                forward = BezierPointUtil.updateControlPoint( point.x, point.y, backward.x, backward.y );

            bezierPoint.forward = {
                x: forward.x,
                y: forward.y
            };

        },

        updateBackwardPoint: function ( bezierPoint ) {

            var point = bezierPoint.point,
                forward = bezierPoint.forward,
                backward = BezierPointUtil.updateControlPoint( point.x, point.y, forward.x, forward.y );

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

    };

    return require( "core/class" ).createClass( 'BezierPoint', {

        constructor: function ( x, y, isSmooth ) {

            //顶点
            this.point = {
                x: x,
                y: y
            };

            //控制点
            this.forward = null;
            this.backward = null;
            //是否平滑
            this.smooth = isSmooth === undefined ? true : !!isSmooth;

        },

        setPoint: function ( x, y ) {

            this.point.x = x;
            this.point.y = y;

            this.update();

            return this;

        },

        setForward: function ( x, y ) {

            !this.forward && ( this.forward = {} );

            this.forward.x = x;
            this.forward.y = y;

            //更新后置点
            this.smooth && BezierPointUtil.updateBackwardPoint( this );

            this.update();

            return this;

        },

        setBackward: function ( x, y ) {

            !this.backward && ( this.backward = {} );

            this.backward.x = x;
            this.backward.y = y;

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

            return this.point;

        },

        getForward: function () {
            return this.forward;
        },

        getBackward: function () {
            return this.backward;
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
