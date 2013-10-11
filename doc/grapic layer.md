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






## Container ##
> 接口

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






## EventHandler ##
> 接口

表示可以处理图形事件的接口

### addEventListener(name, handler(ShapeEvent)) ###
注册指定的事件（如 mousedown、 mousemove、 mouseup、 click、 keydown 等）

### removeEventListener(name, handler(ShapeEvent)) ###
取消已注册的事件






## ShapeEvent ##
> 基类 ： DomEvent

包装原生事件对象，并且提供点击的 Shape 实例

### targetShape : Shape ###
点击的 Shape 实例






## Paper ##
> 基类 : Class
> 实现 : Container, EventHandler
> 所有图形的

### kity.paper(HTMLElement container) : Paper ###
构造函数，给定父容器 Dom，在父容器上创建 Paper 和呈现

### kity.paper(string id) : Paper ###
构造函数，给定父容器 id，在父容器上创建 Paper 和呈现

### getWidth() : float ###
获取 Paper 的宽度，单位为px

### getHeight() : float ###
返回 Paper 的高度，单位为px

### setWidth(float width) : this ###
设置 Paper 的宽度，单位为px

### setHeight(float height) : this ###
设置 Paper 的高度，单位为px

### setViewBox(float x, float y, float width, float height) : this ###
设置 Paper 的坐标范围

> 比如说，ViewBox 为 (0, 0, 100, 100) 的时候，一个大小为 (10, 10) 的矩形宽度占据了 Paper 的十分之一。若 Paper 实际大小为 1000px * 1000px 时，矩形实际大小就是 100px * 100px

### getViewBox() : Box ###
获得 Paper 的坐标范围。

### addShape(Shape shape) : this ###
在激活图层上添加图形

### removeShape(Shape shape) : this ###
在激活图层上删除图形






## Styled ##
> 接口

CSS 样式支持

### addClass(string className) : this ###
添加 CSS Class

### removeClass(string className) : this ###
删除 CSS Class

### hasClass(string className) : this ###
判断是否存在指定的 class

### setStyle(Plain styles) ##
设置元素的样式






## Shape ##
> 基类 : Class
> 抽象
> 实现 : EventHandler, Styled

表示一个图形

### setId(string id) : this ###
设置图形的 id

### getId() : string ###
获得图形的 id

### getType() : string ###
获得图形的类型

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






## Path
> 基类 : Shape

表示一个路径（闭合或不闭合）

### kity.path() : Path ###
构造函数，创建一条空路径

### kity.path(string data): Path ###
构造函数，用指定的路径数据创建路径

### getPathData() : string ###
获得路径的数据表示

### setPathData(string data) : this ###
设置路径的数据

### moveTo(x, y) : this ###
设置路径当前位置

### moveBy(dx, dy) : this ###
设置路径当前位置（相对位置）

### lineTo(x, y) : this ###
从当前位置绘制一条直线到指定的位置

### lineBy(dx, dy) : this ###
从当前位置绘制一条直线到指定的位置（相对位置）

### besierTo(x1, y1, x2, y2, x, y) : this ###
绘制贝塞尔曲线

### besierBy(x1, y1, x2, y2, x, y) : this ###
绘制贝塞尔曲线（相对位置）

### close() : this ###
闭合当前路径

### isClosed() : bool ###
判断当前路径是否已闭合

### strokeBy(Pen pen) : this ###
用指定的画笔描边路径

### fillBy(Brush brush) : this ###
用指定的画刷填充路径





## Group
> 基类 : Shape
> 实现 : Container

将多个图形组合成新的图形，请参照 Container

## kity.group() ##
构造函数创建一个空的组






## Rect
> 基类 : Path

表示一个矩形

### kity.rect(float width, float height) : Rect ###
构造函数，给定矩形的大小

### kity.rect(float x, float y, float width, float height) : Rect ###
构造函数，给定矩形的大小和位置

### setWidth(float width) : this ###
设置矩形的宽度

### setHeight(float height) : this ###
设置矩形的高度

### getRadius() : int #####
获得矩形的圆角大小

### setRadius(int radius) : this ###
设置矩形的圆角大小






## Ellipse
> 基类 : Path

表示一个椭圆

### kity.ellipse(float width, float height) ###
快捷构造椭圆，给定椭圆的大小

### kity.ellipse(float x, float y, float width, float height) ###
快速构造椭圆，给定椭圆的位置和大小

### setWidth(float width) : this ###
设置椭圆的宽度

### setHeight(float height) : this ###
设置椭圆的高度






## Polygon
> 基类 : Path

表示一个多边形

### kity.polygon() : Polygon ###
构造函数，创建一个空多边形

### kity.polygon(Array<Point\>) : Polygon ###
用点序列来构造多边形

### getPoints() : Array<Point> ###
获得多边形的点序列

### insertPoint(float x, float y [, int index]) : this ###
插入一个点到多边形上，可以指定插入的位置，不指定则插入到最后

### setPoint(int index, float x, float y) : this ###
设置多边形某个顶点的坐标






## Line
> 基类 : Path

表示一条线段

### kity.line(float x1, float y1, float x2, float y2) ###
快捷构造函数

### setPoint1(float x, float y) : this ###
设置线段第一个端点的位置

### getPoint1() : Point ###
获取线段第一个端点的位置

### setPoint2(float x, float y) : this ###
设置线段第二个端点的位置

### getPoint2() : Point ###
获取线段第二个端点的位置






## Curve
> 基类 : Path
表示一条曲线

### kity.curve(Array<Points> points) : Curve ###
快捷构造函数，给定曲线经过的点

### insetPoint(float x, float y [, int index]) : this ###
插入一个曲线关键点，可以指定插入位置，不指定则插入到最后

### setPoint(int index, float x, float y) : this ###
设置曲线某个关键点的坐标






## Polyline ##
> 基类 : Path

### kity.polyline() : Polygon ###
构造函数，创建空折线

### kity.polyline(Array<Point>) : Polygon ###
用点序列来创建折线

### getPoints() : Array<Point> ###
获得折线的点序列

### insertPoint(float x, float y [, int index]) : this ###
插入一个点到折线上，可以指定插入的位置，不指定则插入到最后

### setPoint(int index, float x, float y) : this ###
设置折线某个顶点的坐标





## Image ##
> 基类 : Shape

用于显示图片

### kity.image(string url) : Image ###

### setUrl(string url) : this ###
设置图片的 URL

### getUrl() : string
获取图片的 URL






## Text ##
> 基类 : Shape

用于显示文字

### kity.text() : Text ###
创建一个空的文本

### kity.text(string content) : Text ###
创建一个具有指定内容的文本

### setContent(string content) : this ###
设置文本内容

### getContent() : string
获得文本内容

### addSpan(TextSpan tspan) : this ###
添加一个文本块，可以给文本块指定样式

### setPath(string pathdata) : ###
设置文本的排列路径






## TextSpan ##
> 基类 : Class
> 实现 : Styled

内联文本块

### kity.tspan(string content) ###
创建具有指定内容的文本框

### setContent(string content) ###
设置文本块内容

### getContent() : string ###
获得文本块内容




## Brush ##

> inherit: Class
>
> fullname: Kity.Brush

根据画刷设置图形背景样式

### kity.Brush() : Brush ###
创建一个画刷

### get():Brush ###
获取当前图形画刷

### set():Brush ###
设置当前图形画刷

# ColorBrush #
> inherit: Class
>
> implement: Kity.Brush

根据纯色画刷设置图形背景

# LinearGradientBrush #
> inherit: Class
>
> implement: Kity.Brush

根据线性渐变画刷设置图形背景

# RadialGradientBrush #
> inherit: Class
>
> implement: Kity.Brush

根据环形渐变画刷设置图形背景

# ImageBrush #
> inherit: Class
>
> implement: Kity.Brush

根据位图画刷设置图形背景

---

## Pen ##

> inherit: Class
>
> fullname: Kity.Pen

根据画笔设置当前图形边框样式

### kity.Pen() : Pen ###
创建一个笔刷

### getColor():String ###
获取当前图形画笔色值

### getWidth():int ###
获取当前图形画笔大小

### setColor(string color):this ###
设置当前图形画笔颜色

### setWidth(int size):this ###
设置当前图形画笔大小

## SolidPen ##
> inherit: Class
>
> implement: Kity.Brush

根据画笔设置图形边框为实线

## DashedPen ##
> inherit: Class
>
> implement: Kity.Brush

根据画笔设置图形边框为虚线

---

## Filter ##
> inherit: Class
>
> fullname: Kity.Pen

根据滤镜设置图形滤镜效果

### kity.Filter() : Filter ###
创建一个滤镜

### get():Filter ###
获取当前图形滤镜

### set():Filter ###
设置当前图形滤镜

## BlurFilter ##
> inherit: Class
>
> implement: Kity.Brush

设置图形滤镜为模糊

## ShadowFilter ##
> inherit: Class
>
> implement: Kity.Brush

设置图形滤镜为阴影

---

## Color ##
> inherit: Class
>
> fullname: Kity.Color
图形色值操作

### kity.Color() : Color ###
创建一个颜色对象

### get():Color ###
获取当前图形色值

### set(String value):Color ###
设置当前图形色值

### [Static]hsb(h,s,b):Color ###
转换hsb为hex

### [Static]hsb2rgb(h,s,v):Color ###
转换hsb为rgb

### [Static]hsl(h,s,l):Color ###
转换hsl为hex

### [Static]hsl2rgb(h,s,l):Color ###
转换hsl为rgb

### [Static]rgb(h,s,l):Color ###
转换rgb为hex

### [Static]rgb2hsb(h,s,l):Color ###
转换rgb为hsb

### [Static]rgb2hsl(h,s,l):Color ###
转换rgb为hsl

---

## Transform ##
> inherit: Class

图形变换

### translate(int x,int y):this ###
移动图形

### rotate(int degress,int [cx],int [cy]):this ###
旋转图形
_注:如果cx&&cy没有被指定默认是图形中心_

### scale(int sx,int sy,int [cx],int [cy]):this ###
缩放图形
_注:如果cx&&cy没有被指定默认是图形中心_

### matrix(int a,int b,int c,int d,int e,int f):this ###
根据变换矩阵设置图形

