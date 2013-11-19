/*
 * Photoshop钢笔工具
 */

define( function ( require, exports, module ) {

    // 资源引用
    var Paper = require( "graphic/paper" ),
        Color = require( "graphic/color" ),
        Rect = require( "graphic/rect" ),
        PatternBrush = require( "graphic/patternbrush" );

    // 程序变量
    var paper = null,
        Controller = require( "./demo.controller" );

    function init () {

        paper = new Paper( document.getElementById( "kityContainer" ) );
        paper.setViewBox( 0, 0, 600 * 100, 300 * 100 );

        initPaperBackground();

        new Controller().takeover( paper );

    }

    // 初始化画布背景
    function initPaperBackground () {

        var brush = new PatternBrush(),
            rect = null,
            radius = 10*100,
            bgRect = new Rect( 0, 0, 600 * 100, 300 * 100 );

        brush.setWidth( 2*radius ).setHeight( 2*radius );

        for ( var i = 0, len = 2; i < len; i++ ) {

            rect = new Rect( i*radius, i*radius, radius, radius );

            rect.fill( new Color( "lightgray" ).set( 'a', 0.2 ) );

            brush.addShape( rect );

        }

        bgRect.fill( brush );
        paper.addResource( brush );
        paper.addShape( bgRect );

    }

    window.jQuery( init );


} );