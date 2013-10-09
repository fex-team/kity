# Class #
> 基类 : Object
 
所有类的基类



---



# Container #

> 基类 : Class

提供作为图形的容器的功能

## all() : Array<Shape\> ##

获得容器中所有的图形

## count() : int

获得容器中图形的数量

## find(string id) : Shape

查找具有指定 id 的图形

## add(Shape shape) : this ##

添加图形到容器中

## remove(Shape shape) : this ##

删除指定的图形

## clear() : this ##
清除容器中所有的图形



---



# Layer #

> 基类 : Class
> 实现 : Container

表示一个图层。上面的图层会覆盖下面的图层。

## Layer(String name) : this ##
构造函数，name参数指定图层的名称。该名称用于Paper查找Layer做索引

## getName() : String ##
返回图层的名称

## setName(String name) : this ##
设置图层的名称

## getPosition() : int ##
获得图层在Z轴上的位置。图层的位置决定了视觉上的位置，值越大的图层越在上面。默认值：0

## getOpacity() : float ##
返回图层的透明度，取值范围为 0 - 1，0 表示完全透明，1 表示完全不透明

## setOpacity(float number) : this ##
设置图层的透明度，取值范围为 0 - 1，0 表示完全透明，1 表示完全不透明

## getGroup() : String ##

获取图层的分组名称，null 表示不属于任何图层

## setGroup(String group) : this ##

设置图层的分组名称，null 表示不属于任何图层。分组可以用于给Paper查找图层提供索引。

## addEventListener(name, handler(EventObject)) : this ##
添加事件处理函数。图层上所有图形的事件将会派发到注册的 handler 中。支持处理的事件有 mousedown / mouseup / mousemove / keydown / keyup / touchstart / touchmove / touchend

## removeEventListener(name, handler) : this ##
取消事件处理函数



---



# GraphicEvent #

> 基类 : Event

基于 Dom Event 的事件封装，包含 Dom 事件的原生属性和方法

## targetShape : Shape ##
事件发生所在的图形

## targetLayer : Layer ##
事件发生所在的图层



---



# Paper #

> 基类 : Class

> 负责管理图层、图形和视图

## Paper(HTMLElement container) ##
构造函数，给定父容器 Dom，在父容器上创建 Paper 和呈现

## getWidth() : int ##
获取 Paper 的宽度，单位为px

## setWidth(float width) : this ##
设置 Paper 的宽度，单位为px

## getHeight() : int ##
返回 Paper 的高度，单位为px

## setHeight(float height) : this ##
设置 Paper 的高度，单位为px 

## setViewBox(Box box) : Box ##
设置 Paper 的坐标范围

> 比如说，ViewBox 为 (0, 0, 100, 100) 的时候，一个大小为 (10, 10) 的矩形宽度占据了 Paper 的十分之一。若 Paper 实际大小为 1000px * 1000px 时，矩形实际大小就是 100px * 100px

## getViewBox() : Box ##
获得 Paper 的坐标范围。

## getLayerByName(String name) : Layer ##
获得具有指定名称的图层

## getLayerByPosition(int position) : Layer ##
获得指定位置上的图层

## getLayersByGroup(String group) : Array<Layer\> ##
获得指定分组的图层

## getAllLayers() : Array<Layer\> ##
获得所有的图层

## getActiveLayer() : Layer ##
获得当前激活的图层

## setActiveLayer(Layer layer) : this ##
设置当前激活的图层，Paper 上有且仅有一个激活图层

## addLayer(Layer layer[, int position]) : this
添加新的图层。如果指定了位置，则添加到指定位置中，如果position为负数，则表示从最顶端的图层开始计数（-1表示最顶端位置）；如果没有指定位置，则添加在最上面（相当于取值为-1）；
此操作会更新相关图层的 position，position 大于插入点的图层，其 position 递增

## removeLayer(Layer layer) : this ##
删除指定的图层。此操作会更新相关图层的 position，position 大于插入点的图层，其 position 递减

## moveLayer(Layer layer, int position) : this ##
将指定的图层移到相应的位置上。此操作会更新相关图层的 position，如果position为负数，则表示从最顶端的图层开始计数（-1表示最顶端位置）

## addShape(Shape shape) : this ##
在激活图层上添加图形

## removeShape(Shape shape) : this ##
在激活图层上删除图形



---



# Shape
> 基类 : Class
> 
> abstract: true

表示一个图形

## getX() : float ##
获得图形的 x 坐标

## setX(float x) : this ##
设置图形的 x 坐标

## getY() : float ##
获得图形的 y 坐标

## setY(float y) : this ##
设置图形的 y 坐标

## getWidth() : int ##
获取图形的宽度

## getHeight() : int ##
返回图形的高度

## getBoundaryBox() : Box ##
获得图形的边界

## getTransform() : Transform
获取图形当前的变换矩阵

## setTransform(Transform transform) : this ##
设置图形的变换矩阵

## addTo(Container container) : this ##
把图形添加到指定的容器中

## remove() : this ##
从当前图形的容器上移除当前图形

## *addFilter(Filter filter) : this ##
添加滤镜

## *removeFilter(Filter filter) : this ##
删除滤镜

## addClass(string className) : this ##
添加 CSS Class

## removeClass(string className) : this ##
删除 CSS Class

## hasClass(string className) : this ##
判断是否存在指定的 class



---



# Path
> 基类 : Shape

表示一条路径

## getPathData() : String ##
获得路径的数据表示

## setPathData(String data) : this ##
设置路径的数据

## stroke(Pen pen) : this ##
用指定的画笔描边路径

## fill(Brush brush) : this ##
用指定的画刷填充路径



---


# Group
> 基类 : Shape
> 
> inplement: Container
 
将多个图形组合成新的图形，请参照 Container



---



# Rect
> 基类 : Path

表示一个矩形

## Kity.Graphic.Rect(float width, float height) ##
快捷构造函数

## setWidth(float width) : this ##
设置矩形的宽度

## setHeight(float height) : this ##
设置矩形的高度

## getRadius() : int ###
获得矩形的圆角大小

## setRadius(int radius) : this ##
设置矩形的圆角大小



---



# Ellipse
> 基类 : Path

表示一个椭圆

## Kity.Graphic.Ellipse(float width, float height) ##
快捷构造函数

## setWidth(float width) : this ##
设置椭圆的宽度

## setHeight(float height) : this ##
设置椭圆的高度


---



# Polygon
> 基类 : Path

表示一个多边形

## Kity.Graphic.Polygon(Array<Point\>) : Polygon ##
用点序列来构造多边形

## appendPoint(float x, float y) ##
追加一个点到多边形上

## getPoints() : Array<Point> ##
获得多边形的点序列



---



# Line
> 基类 : Path

表示一条线段

## Kity.Graphic.Line(float x1, float y1, float x2, float y2) ##
快捷构造函数

## setPoint1(float x, float y) : this ##
设置线段第一个端点的位置

## getPoint1() : Point ##
获取线段第一个端点的位置

## setPoint2(float x, float y) : this ##
设置线段第二个端点的位置

## getPoint2() : Point ##
获取线段第二个端点的位置



---



# Curve
> 基类 : Path
表示一条曲线

## Kity.Graphic.Curve(Array<Points\> points) ##
快捷构造函数

## appendPoint(float x, float y): this ##
添加一个关键点到曲线上

## close(): Path ##
返回一个闭合的图形



---



# Polyline
> 基类 : Path

## appendPoint(float x, float y): this ##
添加一个折线的顶点

## close(): Ploygon ##
闭合当前折线，返回一个多边形