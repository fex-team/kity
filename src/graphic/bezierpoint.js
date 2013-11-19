/**
 * 贝塞尔点
 */

define( function ( require, exports, module ) {

    var ShapePoint = require( 'graphic/shapepoint' );

    return require( "core/class" ).createClass( 'BezierPoint', {

        constructor: function ( x, y, isSmooth ) {

            //顶点
            this.point = new ShapePoint( x, y );

            /* 注意： 控制点是相对于顶点的坐标 */
            //控制点
            this.forward = new ShapePoint( 0, 0 );

            this.backward = new ShapePoint( 0, 0 );

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
            if(this.smooth) {
                this.backward.setPoint( -x, -y );
            }

            this.update();

            return this;

        },

        setBackward: function ( x, y ) {

            this.backward.setPoint( x, y );

            //更新前置点
            if(this.smooth) {
                this.forward.setPoint( -x, -y );
            }

            this.update();

            return this;

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
