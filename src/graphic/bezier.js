/**
 * 贝塞尔曲线
 */

define( function ( require, exports, module ) {

    var Utils = require( "core/utils" ),
        BezierUtil = {

        /*
         * 验证提供的BezierPoint对象是否有控制点
         * @param point 单个BezierPoint对象或者数组
         */
        validate: function ( point ) {

            var valid = true;

            point = point.length ? point : [ point ];

            Utils.each( point, function ( pit ) {

                valid = !!pit.getForward() && !!pit.getBackward();

                return valid;

            } );

            return valid;

        },

        /*
         * 把给定的点的控制点转换为绝对坐标
         * @param points 需要转换的单个BezierPoint对象或者数组
         * @return 返回一个新的PlainObject对象，该对象的有三个key， 其中point代表原BezierPoint对象的顶点，
         *          forward代表原BezierPoint对象的前置控制点， backward代表原BezierPoint对象的后置控制点。
         *          每一个点也是PlainObject， 都有x、y两个属性， 分别代表点的x、y轴坐标。
         *
         *          如果传递的参数是一个数组， 则返回值也是一个数组。 数组的每个元素是之前描述的PlainObject对象。
         */
        parseToAbsolute: function ( points ) {

            var result = [],
                isArray = points.length;

            !isArray && ( points =  [ points ] );

            Utils.each( points, function ( bezierPoint ) {

                //顶点
                var vertex = bezierPoint.getPoint(),
                    forwardControlPoint = bezierPoint.getForward(),
                    backwardControlPoint = bezierPoint.getBackward();

                result.push( {
                    point: {
                        x: vertex.x,
                        y: vertex.y
                    },
                    forward: {
                        x: vertex.x + forwardControlPoint.x,
                        y: vertex.y + forwardControlPoint.y
                    },
                    backward: {
                        x: vertex.x + backwardControlPoint.x,
                        y: vertex.y + backwardControlPoint.y
                    }
                } );

            } );

            return isArray ? result : result[ 0 ];

        }

    };

    return require( "core/class" ).createClass( 'Bezier', {

        mixins: [ require( "graphic/pointcontainer" ) ],

        base: require( "graphic/path" ),

        constructor: function ( points ) {

            var _self = this;

            this.callBase();

            points = points || [];

            Utils.each( points, function ( point ) {
                _self.appendItem( point );
            } );

            if ( points.length > 0 && !BezierUtil.validate( points ) ) {
                throw new Error( "添加到贝塞尔曲线上的点必须有控制点" );
            }

            this.update();

        },

        update: function () {


            var drawer = null,
                points = this.getItems(),
                //把控制点转化为绝对坐标
                absolutePoints = BezierUtil.parseToAbsolute( points );

            //单独的一个点不画任何图形
            if ( points.length < 2 ) {
                return;
            }

            drawer = this.getDrawer();

            //重绘需要clear掉
            drawer.clear();

            drawer.moveTo( absolutePoints[ 0 ].point.x, absolutePoints[ 0 ].point.y );

            for ( var i = 1, point, forward, backward, len = absolutePoints.length - 1; i <= len; i++ ) {

                point = absolutePoints[ i ].point;
                backward = absolutePoints[ i ].backward;
                forward = absolutePoints[ i - 1 ].forward;

                drawer.besierTo( forward.x, forward.y, backward.x, backward.y, point.x, point.y );

            }

            return this;

        },

        addItem: function ( point, pos ) {

            if ( !BezierUtil.validate( point ) ) {
                throw new Error( '添加到贝塞尔曲线上的点必须有控制点' );
            }

            this.callMixin( point, pos );

            this.update();

        }

    } );

} );
