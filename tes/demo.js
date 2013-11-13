/**
 * Created by hn on 13-11-7.
 */

define( function ( require, exports, module ) {

    //矩形

    var Paper = require( "graphic/paper" ),
        Rect = require( "graphic/rect"),
        Pen = require( "graphic/pen" ),
        Line = require( "graphic/line"),
        Color = require( "graphic/color" ),
        Ellipse = require( "graphic/ellipse" ),
        Circle = require( "graphic/circle" ),
        Image = require( "graphic/image" ),
        Polygon = require( "graphic/polygon" ),
        Palette = require( "graphic/palette" ),
        Polyline = require( "graphic/polyline"),
        ColorBrush = require( "graphic/colorbrush" ),
        Curve = require( "graphic/curve" );

//    var paper = new Paper( document.body ),
//        rect = new Rect( 0, 0, 100, 50 );
//
//    paper.addChild( rect );
//    rect.setWidth( 500 );
//    rect.setHeight( 100 );
//    rect.setRadius( 5 );
//
//    window.setTimeout( function () {
//
//        rect.setSize( 50, 20 );
//        rect.setPosition( 100, 100 );
//        rect.setRadius( 0 );
//
//    }, 1000 );

    //直线
//    var paper = new Paper( document.body ),
//        line = new Line( 10, 10, 200, 200 );
//
//    paper.addChild( line );

    //折线
//    var paper = new Paper( document.body ),
//        polyline = new Polyline(),
//        pen = new Pen( new Color( "#ff00ff" ) );
//
//    polyline.appendChild( { x: 10, y: 20 } );
//    polyline.appendChild( { x: 30, y: 60 } );
//    polyline.appendChild( { x: 20, y: 50 } );
//
//    polyline.stroke( pen );
//    paper.addChild( polyline );

    //pen测试
//    var paper = new Paper( document.body ),
//        pen = new Pen(),
//        color = new Color( "rgba( 3, 4, 5, 0.5 )" ),
//        line = new Line( 10, 10, 50, 50 );
//
//    pen.setColor( color );
//
//    line.stroke( pen );
//    paper.addChild( line );
//
//    window.setTimeout( function () {
//
//        pen.setColor( Color.parse( "#ff0000" ) );
//        pen.setLinecap( 'round' );
//        pen.setLinejoin( 'round' );
//        pen.setDashArray( [ 5, 3 ] );
//        pen.setOpacity( 1 );
//        line.stroke( pen );
//
//    }, 1000 );

    //ellipse测试
//    var paper = new Paper( document.body ),
//        ellipse = new Ellipse( 50, 50, 20, 20 );
//
//    paper.addChild( ellipse );

    //circle测试
//    var paper = new Paper( document.body ),
//        circle = new Circle( 50, 50, 20 );
//
//    paper.appendChild( circle );

    //图片测试
//    var image = new Image( "http://www.baidu.com/img/bdlogo.gif", 100, 100 ),
//        paper = new Paper( document.body );
//
//    paper.appendChild( image );
//
//    window.tt = image;

//    //多边形
//    var polygon = new Polygon( [ { x: 1, y: 2 }, { x: 50, y: 10 }, { x: 120, y: 300 } ] ),
//        paper = new Paper( document.body );
//
//    polygon.node.setAttribute( "fill", "transparent" );
//    polygon.stroke( new Pen( new Color( "blue" ) ) );
////    polygon.appendChild( { x: 32, y: 40 } );
//    paper.addChild( polygon );
//
//    window.tt = Palette;

    //折线
//    var polyline = new Polyline( [ { x: 1, y: 2 }, { x: 50, y: 10 }, { x: 120, y: 300 } ] ),
//        paper = new Paper( document.body );
//
////    polygon.appendChild( { x: 32, y: 40 } );
//    paper.addItem( polyline );
//    polyline.stroke( new Pen( new Color( "#ff0000" ) ) );

    //圆
//    var circle = new Circle( 50, 50, 30 ),
//        paper = new Paper( document.body );
//
//    circle.stroke( new Pen( new Color( "red" ) ) );
////    polygon.appendChild( { x: 32, y: 40 } );
//    paper.addItem( circle );

    //曲线
    var points = [ {x: 130, y: 120}, { x: 530, y: 183 }, { x: 100, y: 250 } ],
        curve = new Curve( points ),
        paper = new Paper( document.body );

    for ( var i = 0, len = points.length; i < len; i++ ) {

        var currentCircle = new Circle( points[ i ].x, points[ i ].y, 3 );

        currentCircle.fill( new ColorBrush( new Color( "red" ) ) );

        paper.addItem( currentCircle );

    }

    curve.on( "click2", function () {
        alert(3)
    } );

    paper.on("click2", function () {
        alert(4)
    })
    window.tt = curve;
    curve.stroke( new Pen( new Color( "red" ) ) );
    paper.appendItem( curve );

} );