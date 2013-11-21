/*
 * PS 钢笔工具 控制逻辑
 */
define( function ( require, exports, module ) {

    // 资源引入
    var Bezier = require( "graphic/bezier" ),
        Color = require( "graphic/color" ),
        Pen = require( "graphic/pen" ),
        Utils = require( "core/utils" ),
        Rect = require( "graphic/rect" ),
        // 引入可绘制的点集合
        PointGroup = require( "./demo.pointgroup" ),
        BezierPoint = require( "graphic/bezierpoint" );


    function Controller ( paper ) {

        this.paper = paper || null;
        this.bezier = null;
        this.bezierPoints = null;
        this.pointGroup = null;

    }

    Utils.extend( Controller.prototype, {

        takeover: function ( paper ) {

            paper && ( this.paper = paper );

            initListener( this );

        },

        setBezier: function ( bezier ) {

            this.bezier = bezier;
            this.bezierPoints = [];

            return this;

        },

        getBezier: function () {

            return this.bezier;

        },

        setPointGroup: function ( pointGroup ) {

            this.pointGroup = pointGroup;

            return this;

        },

        getPointGroup: function () {

            return this.pointGroup;

        },

        addPoint: function ( point ) {

            this.bezierPoints && this.bezierPoints.push( point );

            return this;

        },

        getPoints: function () {

            return this.bezierPoints;

        }

    } );


    return Controller;

    // 私有方法实现

    // 初始化交互事件监听器
    function initListener ( controller ) {

            // 记录是否允许所有事件的监听
        var isBegin = false,
            // 记录是否需要更新曲线
            isUpdateable = false,
            paper = controller.paper,
            currentBezier = null;

        paper.on( "mousedown", function ( e ) {

            var point = null;

            // 切换监听状态
            if ( !isBegin ) {
                isBegin = true;
                currentBezier = createBezier( paper );
                //设置当前controller处理的贝塞尔曲线
                controller.setBezier( currentBezier );
                controller.setPointGroup( createPointGroup( paper ) );
            }

            isUpdateable = false;

            // 获取当前鼠标点击在用户坐标系上的映射点
            point = e.getPosition();

            updateBezier( controller, point );

        } );

        // 更新控制点
        paper.on( "mousemove", function ( e ) {

            var point = null,
                bezierPoint = null;

            if ( !isBegin || isUpdateable ) {
                return;
            }

            point = e.getPosition();

            currentBezier.getLastPoint().setForward( point.x, point.y );

        } );

        paper.on( "mouseup", function () {

            isUpdateable = isBegin;

        } );

    }

    // 画贝塞尔曲线
    function updateBezier ( controller, point ) {

        var bezierPoint = new BezierPoint( point.x, point.y, true );

        //添加可绘制控制点
        controller.getPointGroup().addPoint( bezierPoint.clone() );

        //记录贝塞尔的控制点
        controller.addPoint( bezierPoint );

        //更新贝塞尔曲线的点
        controller.getBezier().setPoints( controller.getPoints() );


    }

    // 创建一个新的贝塞尔
    function createBezier ( paper ) {

        var bezier = new Bezier();
        bezier.stroke( new Pen( new Color( "black" ) ).setWidth( 100 ) );
        paper.addShape( bezier );

        return bezier;

    }

    function createPointGroup ( paper ) {

        var pointGroup = new PointGroup();

        paper.addShape( pointGroup );

        return pointGroup;

    }


} );