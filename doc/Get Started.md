# Kity Graphic : Get Started

本文档简单介绍 Kity Graphic 中的概念和使用

## 基础框架

简单介绍 Kity Graphic 的设计。

### Class 系统

Kity Graphic 使用 OOP 的编程和接口风格，通过创建对象和在对象上进行操作来实现图形的绘制、移动、更新、动画、交互等功能。

用户可以通过继承现有的类来封装更多所需要的图形，用以复用。

关于 Kity Class 系统的更详细文档，请参考 [Kity Graphic OOP.md](kity-graphic-oop.md) (还没写，别着急点)

### Pipe 函数

所有 Kity Graphic 的对象都有一个 `pipe` 函数，它做的事情很简单：接收一个函数 fn，这个函数会被调用，并且调用的上下文以及第一个参数都是当前对象。这个函数可以让对对象的一连串操作整理的干净起来。

下面是不使用 `pipe` 函数绘制一个用渐变填充、虚线描边并且旋转了30度的矩形的代码。

	var paper = new Paper(document.body);
	var rect = new Rect(0, 0, 10, 10);
	var brush = new LinearGradientBrush();
	
	brush.addStop(0, new Color('red'));
	brush.addStop(0.5, new Color('yellow'));
	brush.addStop(1, new Color('blue'));
	paper.addResource( this );
	rect.fill( brush );
	
	var pen = new Pen();
	pen.setDashArray([2, 2]);
	pen.setWidth(1);
	pen.setColor('gray');
	rect.stroke( pen );
	
	rect.rotate(30);
	
这个代码看起来还行，不过对比一下使用 `pipe` 函数的版本：

	var paper = new Paper(document.body);
	
	paper.addItem(new Rect(0, 0, 10, 10).pipe( function() {
	
		this.fill(new LinearGradientBrush.pipe( function( brush ) {
			brush.addStop(0, new Color('red'));
			brush.addStop(0.5, new Color('blue'));
			brush.addStop(1, new Color('yellow'));
			paper.addResource(brush);
		}));
		
		this.stroke(new Pen().pipe( function( pen ) {
			pen.setDashArray([2, 2]);
			pen.setWidth(1);
			pen.setColor('gray');
		}));
		
		this.rotate(30);
		
	}));
	
恰当地使用 `pipe` 函数，可以提高代码的可读性和美观性。


## 使用 Paper ##

Paper 是所有图形和资源的跟容器，所有图形和资源（资源的概念请参照“Resources”）由 Paper 集中管理。

### 初始化 Paper

Kity 中所有的对象都是通过使用 new 运算符创建的，有一些类型要求你在创建的时候传递必须的参数到构造函数中。用下面的代码可以创建一个 Paper，并且会在指定的容器中渲染：

	var paper = new Paper('container');

	// 或者直接传 Dom 对象：
	var paper = new Paper(document.body);

如果需要，你也可以重新获取容器：

	var container = paper.getContainer();
    
### 设置宽高和视野

宽高和事业是对 Paper 最基本的设置。

宽高指的是 Paper 在浏览器中渲染的大小，可以使用像素或百分比作为单位：

	paper.setWidth(800).setHeight(600);
	// 或使用百分比：
	paper.setWidth('100%').setHeight('100%');

视野定义了 Paper 下图形的坐标系统。由四个值来定义：( x, y, width, height )。其中 x 和 y 确定 Paper 左上角的点再坐标系里的坐标，而 width 和 height 就表示 Paper 显示的坐标范围。

![Viewbox 说明](./images/viewbox.png)

上面两个矩形的大小都是 60 * 40，左上角坐标都是 (10, 10)，但是因为 Paper 的 ViewBox 不一样，导致了其呈现不一样。设置 Paper 的 ViewBox 使用 setViewBox 接口：

	paper.setViewBox(0, 0, 400, 300);

如果需要，也可以获得 Paper 当前的 ViewBox：
	
	/*
		vbox is like: 
		{
			x: 0,
			y: 0,
			width: 400,
			height: 300
		}
	*/
	var vbox = paper.getViewBox();
	
### 图形管理

Paper 是一个容器（`Container`），可以向其添加和移除图形：
	
	var rect = new Rect(0, 0, 10, 10);
	paper.addItem( rect );
	// 还支持：appendItem()、prependItem()、addItem(shape, pos) 接口 
	
	// 通过以下方式移除已经添加的图形：
	paper.removeItem( paper.indexOf(rect) );
	
	// 或者更简单的：
	rect.remove();

要获得当前 Paper 上所有的图形，可以使用 `paper.getItems()` 接口。要获得指定位置的图形，可以使用 `paper.getItem(index)` 接口：
	
	paper.clear(); // clear all items
	paper.addItem( rect );
	paper.addItem( circle );
	
	assert( rect === paper.getItem(0) ); // true
	assert( circle === paper.getItem(1) ); // true
	
假如自己设置了图形的 id，那么可以根据 id 获得图形：

> 所有的图形在创建的时候就会自动生成一个唯一的 id，用户也可以去使用自己设置的 id

	rect.setId('my-rect');
	paper.addItem(rect);
	assert( paper.getShapeById('my-rect') === rect ) // true
	
> 对于所有的 `Container` 在 Kity 中都有统一的接口：
	
	.addItem( item, index )
	.appendItem( item )
	.prependItem( item )
	.getItem( index )
	.getItems()
	.getFirstItem()
	.getLastItem()
	.eachItem( fn(index, item) )
	.removeItem( index )
	.clear()
	
> 被添加到容器中的元素，会有一个 container 字段指向其容器的引用，比如添加到 Paper 中的图形：
	
	paper.addItem( rect );
	assert( rect.container === paper ); //true
	
	rect.remove();
	assert( rect.container === paper ); //false
	assert( rect.remove === undefined ); //true
	
### 资源管理

在使用 Kity Graphic 的过程中，有一些需要使用的资源，需要加到 Paper 上，才会产生效果。比如 LinearGradientBrush、RadialGradientBrush、PatternBrush 等。往 Paper 添加和移除资源使用以下接口：

	var brush = new LinearGradientBrush().pipe(function() {
		this.addStop(0, new Color('red'));
		this.addStop(1, new Color('blue'));
	});
	paper.addResource( brush );
	rect.fill( brush );
	
	// 资源被移除后，矩形的填充会失效
	paper.removeResource( brush );
	
## 创建图形

Kity Graphic 内置了 Path、Rect、Ellipse、Circle、Polyline、Polygon、Curve、Besier 等基本几何图形。

### Path

Path 是 Kity 中最强大的工具，可以绘制任意图形。其他的几何图形都是继承 Path 而来。Path 能识别 SVG 中定义的 [Path Data](http://www.w3.org/TR/SVG/paths.html#PathData) 字符串格式。可以通过这样一个字符串构造 Path：

	var triangle = new Path('M 0 0 L 100 100 100 200 Z');
	
也可以直接访问这个 Path Data：

	triangle.setPathData('M 0 0 L 100 100 0 100 Z');
	console.log(triangle.getPathData());
	
当然，如果不喜欢拼凑字符串，或者怕拼凑出错的用户，可以选择使用 PathDrawer 来绘制路径：

	var triangle2 = new Path().getDrawer().pipe(function() {
		this.moveTo(0, 0);
		this.lineTo(100, 100);
		this.lineTo(50, 173);
		this.close();		
	});
	console.log(triangle2.getPathData()); // 'M 0 0 L 100 100 L 50 173 Z'
	
`path.getDrawer()` 返回的是一个 PathDrawer 实例，它与具体的 Path 绑定。PathDrawer 的方法包括：

	d.moveTo(x, y)
	d.moveBy(dx, dy)
	d.lineTo(x, y)
	d.lineBy(dx, dy)
	d.arcTo(rx, ry, xr, laf, sf, x, y )
	d.arcBy(rx, ry, xr, laf, sf, dx, dy )
	d.carcTo(r, x, y, laf, sf)
	d.carcBy(r, dx, dy, laf, sf)
	d.besierTo(x1, y1, x2, y2, x, y)
	d.besierBy(dx1, dy1, dx2, dy2, dx, dy)
	d.close()
	d.clear()

其中 `carcTo` 为 `arcTo` 的快捷操作，用于绘制圆弧

### Rect

Rect 是使用非常广泛的图形。Rect 的参数非常简单：

	var rect = new Rect(10, 20, 100, 200);
	console.log( rect.getX() ); // 10
	console.log( rect.getY() ); // 20
	console.log( rect.getWidth() ); // 100
	console.log( rect.getHeight() ); // 200
	
你可以随时更改矩形的位置和宽高：
	
	rect.setX(20).setY(10);
	rect.setWidth(100).setHeight(200);
	// or
	rest.setPosition(20, 10)
	rect.setSize(100, 200);

Kity 的矩形支持圆角：

	var rect = new Rect(10, 20, 100, 200, 5);
	console.log( rect.getRadius() ); // 5

圆角也可以随时修改

### Ellipse

Ellipse 用于绘制一个椭圆：
	
	// 圆心：(0, 0)
	// x 轴半径：200
	// y 轴半径：100
	var ellipse = new Ellipse(0, 0, 200, 150);
	console.log( ellipse.getCenter() ); // {x: 0, y: 0}
	console.log( ellipse.getRadiusX() ); // 200
	console.log( ellipse.getRadiusY() ); // 150
	
可以随时更改椭圆圆心位置以及半径：
	
	ellipse.setCenterX(100).setCenterY(200);
	ellipse.setRadiusX(30).setRadiusY(40);	
	// or
	ellipse.setCenter(100, 200);
	ellipse.setRadius(30, 40);

### Circle

Circle 用于绘制一个圆形：

	// 圆心：(200, 300)
	// 半径：50
	var circle = new Circle(200, 300, 50);
	console.log( circle.getCenter() ); // {x: 200, y: 300}
	console.log( circle.getRadius() ); // 50 

可以随时更改圆形的圆心及半径

	circle.setCenter(100, 200);
	// or
	circle.setCenterX(100).setCenterY(200);
	
	circle.setRadius(60);
	
### Polyline

Polyline 用于绘制折线，通过添加关键点到折线上，可以形成经过这些点的折线

	var polyline = new Polyline().pipe(function() {
		this.addItem( {x: 10, y: 10 } );
		this.addItem( {x: 24, y: 33 } );
		this.addItem( {x: 63, y: 22 } );
	});

Polyline 是关键点的集合，支持所有的 `container` 操作

### Polygon

Polygon 用于绘制多边形，其使用方法和 Polyline 完全一致，只是最后会在首位两个点连一条直线，闭合成多边形。

### Curve

Curve 用于绘制曲线，该曲线经过用户指定的点集。如果曲线闭合，则形成一个平滑的包围形状。

	var curve = new Curve().pipe(function() {
		this.addItem( {x: 10, y: 10 } );
		this.addItem( {x: 24, y: 33 } );
		this.addItem( {x: 63, y: 22 } );
		this.setSmoothScale(50);
	});
	
`setSmoothScale()` 设置转折点处的光滑程度，值越大越光滑，为 0 的时候绘制成折线。

### Besier

Besier 用于绘制贝塞尔曲线。贝塞尔曲线由一系列的转换点构成，每个转换点包含一个顶点坐标以及两个控制点坐标。其中顶点坐标是绝对坐标，控制点坐标是相对顶点的坐标。如果转换点是设置为光滑的，那么两个控制点是会相互影响的，否则将相对独立。






























----
> 文档结束
