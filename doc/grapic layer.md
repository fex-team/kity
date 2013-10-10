# Kity Graphic Layer API #

## Class ##
> 基类 : Object

所有类的基类

### [Static] extend( class0 [, classi...], extensions ) ###
拓展功能到指定的类上

```javascript
Class.extend( Paper, Group, {
    getAllShape: function() { ... },
    getShapeCount: function() { ... },
    ...
})
```



---



## Container ##
> 基类 : Class

提供作为图形的容器的功能

### getAllShape() : Array<Shape\> ###
获得容器中所有的图形

### getShapeCount() : int
获得容器中图形的数量

### getShapeById(string id) : Shape
根据 id 获得指定的图形

### getShapeByClass(string className) : Array<Shape>
根据 CSS Class 获得指定的图形集合

### addShape(Shape shape) : this ###
添加图形到容器中

### removeShape(Shape shape) : this ###
删除指定的图形

### clear() : this ###
清除容器中所有的图形



---



## EventHandler ##
> 基类 ： Class

表示可以处理图形事件的接口

### addEventListener(name, handler(ShapeEvent)) ###
注册指定的事件（如 mousedown、 mousemove、 mouseup、 click、 keydown 等）

### removeEventListener(name, handler(ShapeEvent)) ###
取消已注册的事件



---



## ShapeEvent ##
> 基类 ： DomEvent

包装原生事件对象，并且提供点击的 Shape 实例

### targetShape : Shape ###
点击的 Shape 实例



---



## Paper ##
> 基类 : Class
> 实现 : Container, EventHandler
> 所有图形的

### Kity.Paper(HTMLElement container) ###
构造函数，给定父容器 Dom，在父容器上创建 Paper 和呈现

### getWidth() : int ###
获取 Paper 的宽度，单位为px

### getHeight() : int ###
返回 Paper 的高度，单位为px

### setWidth(float width) : this ###
设置 Paper 的宽度，单位为px

### setHeight(float height) : this ###
设置 Paper 的高度，单位为px 

### setViewBox(Box box) : Box ###
设置 Paper 的坐标范围

> 比如说，ViewBox 为 (0, 0, 100, 100) 的时候，一个大小为 (10, 10) 的矩形宽度占据了 Paper 的十分之一。若 Paper 实际大小为 1000px * 1000px 时，矩形实际大小就是 100px * 100px

### getViewBox() : Box ###
获得 Paper 的坐标范围。

### addShape(Shape shape) : this ###
在激活图层上添加图形

### removeShape(Shape shape) : this ###
在激活图层上删除图形



---



## Shape
> 基类 : Class
> 抽象类 : true
> 实现 : EventHandler

表示一个图形

### getX() : float ###
获得图形的 x 坐标

### getY() : float ###
获得图形的 y 坐标

### setX(float x) : this ###
设置图形的 x 坐标

### setY(float y) : this ###
设置图形的 y 坐标

### getWidth() : int ###
获取图形的宽度

### getHeight() : int ###
返回图形的高度

### getBoundaryBox() : Box ###
获得图形的边界

### getTransform() : Transform
获取图形当前的变换矩阵

### setTransform(Transform transform) : this ###
设置图形的变换矩阵

### addTo(Container container) : this ###
把图形添加到指定的容器中

### remove() : this ###
从当前图形的容器上移除当前图形

### *addFilter(Filter filter) : this ###
添加滤镜

### *removeFilter(Filter filter) : this ###
删除滤镜

### addClass(string className) : this ###
添加 CSS Class

### removeClass(string className) : this ###
删除 CSS Class

### hasClass(string className) : this ###
判断是否存在指定的 class

### setStyle(Plain styles) ##
设置元素的样式



---



## Path
> 基类 : Shape

表示一条路径

### getPathData() : String ###
获得路径的数据表示

### setPathData(String data) : this ###
设置路径的数据

### strokeBy(Pen pen) : this ###
用指定的画笔描边路径

### fillBy(Brush brush) : this ###
用指定的画刷填充路径



---


## Group
> 基类 : Shape
> 实现 : Container
 
将多个图形组合成新的图形，请参照 Container



---



## Rect
> 基类 : Path

表示一个矩形

### Kity.Graphic.Rect(float width, float height) ###
快捷构造函数

### setWidth(float width) : this ###
设置矩形的宽度

### setHeight(float height) : this ###
设置矩形的高度

### getRadius() : int #####
获得矩形的圆角大小

### setRadius(int radius) : this ###
设置矩形的圆角大小



---



## Ellipse
> 基类 : Path

表示一个椭圆

### Kity.Graphic.Ellipse(float width, float height) ###
快捷构造函数

### setWidth(float width) : this ###
设置椭圆的宽度

### setHeight(float height) : this ###
设置椭圆的高度


---



## Polygon
> 基类 : Path

表示一个多边形

### Kity.Graphic.Polygon(Array<Point\>) : Polygon ###
用点序列来构造多边形

### appendPoint(float x, float y) ###
追加一个点到多边形上

### getPoints() : Array<Point> ###
获得多边形的点序列



---



## Line
> 基类 : Path

表示一条线段

### Kity.Graphic.Line(float x1, float y1, float x2, float y2) ###
快捷构造函数

### setPoint1(float x, float y) : this ###
设置线段第一个端点的位置

### getPoint1() : Point ###
获取线段第一个端点的位置

### setPoint2(float x, float y) : this ###
设置线段第二个端点的位置

### getPoint2() : Point ###
获取线段第二个端点的位置



---



## Curve
> 基类 : Path
表示一条曲线

### Kity.Graphic.Curve(Array<Points\> points) ###
快捷构造函数

### appendPoint(float x, float y): this ###
添加一个关键点到曲线上

### close(): Path ###
返回一个闭合的图形



---



## Polyline
> 基类 : Path

### appendPoint(float x, float y): this ###
添加一个折线的顶点

### close(): Ploygon ###
闭合当前折线，返回一个多边形