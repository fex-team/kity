/*
 * Photoshop钢笔工具
 */


define( function ( require, exports, module ) {

    // 资源引用
    var Paper = require( "graphic/paper" ),
        Bezier = require( "graphic/bezier" ),
        Group = require( "graphic/group" ),
        Color = require( "graphic/color" ),
        Rect = require( "graphic/rect" ),
        PatternBrush = require( "graphic/patternbrush" ),
        BezierPoint = require( "graphic/bezierpoint" );

    // 程序变量
    var paper = null;

    function init () {

        var tt = new Color();
        debugger;
//        paper = new Paper( document.body );
//
//        paper.setViewBox(0, 0, 100, 100);
//
//        initPaperBackground();

    }


    // 初始化画布背景
    function initPaperBackground () {

        var brush = new PatternBrush(),
            rect = null,
            group = new Rect(0, 0, 100, 100);

        brush.setWidth( 10 ).setHeight( 10 );

        for ( var i = 0, len = 2; i < len; i++ ) {

            rect = new Rect( i*5, i*5, 5, 5 );

            rect.fill( new Color( "dimgray" ) );

            brush.addShape( rect );

        }

        group.fill( brush );
//        group.node.setAttribute( "width", "100%" );
//        group.node.setAttribute( "height", "100%" );
        paper.addResource( brush );
        paper.addShape( group );

    }

    window.jQuery( init );


} );