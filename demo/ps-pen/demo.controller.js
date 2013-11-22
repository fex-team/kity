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

        this.drawState = false;

        // 记录当前是否处于更新状态
        this.modifyState = false;

        // 记录更新状态的持久信息
        this._modifyStatus = null;

        // 允许重新拖动编辑的
        this.editable = false;

    }

    Utils.extend( Controller.prototype, {

        takeover: function ( paper ) {

            paper && ( this.paper = paper );

            initListener( this );

        },

        enableDraw: function () {
            this.drawState = true;
        },

        disableDraw: function () {
            this.drawState = false;
        },

        enableModify: function () {
            this.modifyState = true;
        },

        disableModify: function () {
            this.modifyState = false;
        },

        // 设置更新状态
        setModifyStatus: function ( status ) {
            this._modifyStatus = status;
        },

        clearModifySatus: function () {
            this._modifyStatus = null;
        },

        getModifyStatus: function () {
            return this._modifyStatus;
        },

        enableEdit: function () {
            this.editable = true;
        },

        disableEdit: function () {
            this.editable = false;
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
            currentBezier = null,
            currentPointGroup = null;

        paper.on( "mousedown", function ( e ) {

            var point = null;

            e.preventDefault();

            if ( !controller.drawState ) {
                return;
            }

            // 切换监听状态
            if ( !isBegin ) {
                isBegin = true;
                currentBezier = createBezier( paper );
                currentPointGroup = createPointGroup( paper );

                listenPointGroup( currentPointGroup, controller );

                //设置当前controller处理的贝塞尔曲线
                controller.setBezier( currentBezier );
                controller.setPointGroup( currentPointGroup );
            }

            isUpdateable = false;

            // 获取当前鼠标点击在用户坐标系上的映射点
            point = e.getPosition();

            updateBezier( controller, point );

        } );

        // 绘制时 更新控制点
        paper.on( "mousemove", function ( e ) {

            var point = null,
                bezierPoint = null;

            e.preventDefault();

            if ( !controller.drawState ) {
                return;
            }

            if ( !isBegin || isUpdateable ) {
                return;
            }

            point = e.getPosition();

            currentBezier.getLastPoint().setForward( point.x, point.y );
            currentPointGroup.getLastPoint().setForward( point.x, point.y );

        } );

        // 编辑时拖动更新
        paper.on( "mousemove", function ( e ) {

            var mousePoint = null,
                currentPoint = null,
                pointIndex = -1;

            e.preventDefault();

            // 不可编辑
            if ( !controller.editable ) {
                return;
            }

            mousePoint = e.getPosition();
            pointIndex = controller._modifyStatus.pointIndex;
            currentPoint = currentPointGroup.getPointsByIndex( pointIndex );

            switch ( controller._modifyStatus.pointType ) {

                case PointGroup.TYPE_FORWARD:
                    currentPoint.setForward( mousePoint.x, mousePoint.y );
                    currentBezier.getPoint( pointIndex ).setForward( mousePoint.x, mousePoint.y );
                    break;

                case PointGroup.TYPE_BACKWARD:
                    currentPoint.setBackward( mousePoint.x, mousePoint.y );
                    currentBezier.getPoint( pointIndex ).setBackward( mousePoint.x, mousePoint.y );
                    break;

                case PointGroup.TYPE_VERTEX:
                    currentPoint.moveVertex( mousePoint.x, mousePoint.y );
                    currentBezier.getPoint( pointIndex ).moveVertex( mousePoint.x, mousePoint.y );
                    break;

            }


        } );

        paper.on( "mouseup", function () {

            if ( controller.drawState ) {

                isUpdateable = isBegin;

            } else if ( controller.modifyState ) {

                controller.disableEdit();
                // 清空状态
                controller.clearModifySatus();

            }

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

    // 监听点上的事件
    function listenPointGroup ( pointGroup, controller ) {

        pointGroup.on( "pointmousedown", function ( e ) {

            // 非modify状态， 不处理
            if ( !controller.modifyState ) {
                return;
            }

            // 运行更新
            controller.enableEdit();

            controller.setModifyStatus( {
                pointType: e.targetPointType,
                pointIndex: e.targetPointIndex
            } );

            //更新当前的点
            this.selectPoint( e.targetPointIndex );

        } );

    }


} );