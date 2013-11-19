/*
 * PS 钢笔工具 控制逻辑
 */
define( function ( require, exports, module ) {

    // 资源引入
    var Bezier = require( "graphic/bezier" ),
        Utils = require( "core/utils" ),
        BezierPoint = require( "graphic/bezierpoint" );



    function Controller ( paper ) {

        this.paper = paper || null;

    }

    Utils.extend( Controller.prototype, {

        takeover: function ( paper ) {

            paper && ( this.paper = paper );

            initListener( this );

        }

    } );


    return Controller;

    // 私有方法实现

    // 初始化交互事件监听器
    function initListener ( controller ) {

        var isBegin = false,
            //记录用户点击的点
            points = [],
            paper = controller.paper,
            currentBezier = null;

        paper.on( "mousedown", function ( e ) {

            //切换监听状态
            if ( !isBegin ) {
                isBegin = true;
                currentBezier = createBezier( paper );
            }

            //获取当前鼠标点击在用户坐标系上的映射点
            var point = e.getPosition();

            points.push( point );

            updateBezier( currentBezier, points );

        } );

    }


    // 更新贝塞尔曲线
    function updateBezier ( bezier, points ) {

        var bezierPoints = [];

        Utils.each( points, function ( point ) {

            bezierPoints.push( new BezierPoint( point.x, point.y ) );

        } );

        bezier.setPoints( bezierPoints );

    }

    // 创建一个新的贝塞尔
    function createBezier ( paper ) {

        var bezier = new Bezier();
        bezier.stroke();
        paper.addShape( bezier );

        return bezier;

    }


} );