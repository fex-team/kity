# Class #
> inherit: Object
> 
> fullname: Kity.Class
 
所有类的基类

# Container #

> inherit: Class
> 
> fullname: Kity.Graphic.Container

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

# Layer #

> inherit: Class
> 
> implement: Graphic.Container

表示一个图层。上面的图层会覆盖下面的图层。

## Layer(String name) : this ##
构造函数

## setName(String name) : this ##
设置图层的名称

## getName() : String ##
返回图层的名称

## getPosition() : int ##
获得图层的位置。图层的位置决定了视觉上的位置，值越大的图层越在上面。

## setOpacity(float number) : this ##
设置图层的透明度，取值范围为 0 - 1，0 表示完全透明，1 表示完全不透明

## getOpacity() : number ##
返回图层的透明度，取值范围为 0 - 1，0 表示完全透明，1 表示完全不透明

## getGroup() : String ##

获取图层的分组名称，null 表示不属于任何图层

## setGroup(String group) : this ##

设置图层的分组名称，null 表示不属于任何图层

# Paper #

> inherit: Class

> 负责管理图层、图形和视图

## getSize() : Size ##
获取 Paper 的大小

## setSize(Size size) : this ##
返回 Paper 的大小

## getViewBox() : Box ##
获得 Paper 的坐标范围。

> 比如说，ViewBox 为 (0, 0, 100, 100) 的时候，一个大小为 (10, 10) 的矩形宽度占据了 Paper 的十分之一。若 Paper 实际大小为 1000px * 1000px 时，矩形实际大小就是 100px * 100px

## setViewBox(Box box) : Box ##
设置 Paper 的坐标范围

## getLayerByName(String name) : Layer ##
获得具有指定名称的图层

## getLayerByPosition(int position) : Layer ##
获得指定位置上的图层

## getLayersByGroup(String group) : Array<Layer\>
获得指定分组的图层

## getAllLayers() : Array<Layer\>
获得所有的图层

## getActiveLayer() : Layer ##
获得当前激活的图层

## setActiveLayer(Layer layer) : this ##
设置当前激活的图层，Paper 上有切仅有一个激活图层

## addLayer(Layer layer[, int position]) : this
添加新的图层。如果指定了位置，则添加到指定位置中；如果没有指定位置，则添加在最上面；
此操作会更新相关图层的 position，position 大于插入点的图层，其 position 递增

## removeLayer(Layer layer) : this ##
删除指定的图层。此操作会更新相关图层的 position，position 大于插入点的图层，其 position 递减

## addShape(Shape shape) : this ##
在激活图层上添加图形

## removeShape(Shape shape) : this ##
在激活图层上删除图形

# Shape
> inherit: Class
> 
> abstract: true

表示一个图形

## getBoundaryBox() : Box ##
获得图形的边界

## getPosition() : Point ##
获得图形的位置

## setPosition(Point position) : this ##
设置图形的位置

## getTransform() : Transform
获取图形当前的变换矩阵

## setTransform(Transform transform) : this ##
设置图形的变换矩阵

## *addFilter(Filter filter) : this ##
添加滤镜

## *removeFilter(Filter filter) : this ##
删除滤镜

# Path
> inherit: Shape

表示一条路径

## getPathData() : String ##
获得路径的数据表示

## setPathData(String data) : this ##
设置路径的数据

## stroke(Pen pen) : this ##
用指定的画笔描边路径

## fill(Brush brush) : this ##
用指定的画刷填充路径

# Group
> inherit: Shape
> 
> inplement: Container
 
将多个图形组合成新的图形，请参照 Container

# Rect
> inherit: ClosedPath

表示一个矩形

## getSize() : Size ##
获取矩形的大小

## setSize(Size size) : this ##
设置矩形的大小

## getRadius() : int ###
获得矩形的圆角大小

## setRadius(int radius) : this ##
设置矩形的圆角大小


# Ellipse
> inherit: ClosedPath

表示一个椭圆

## getSize() : Size ##
获得椭圆的大小

## setSize(Size size) : this ##
设置椭圆的大小

# Polygon
> inherit: ClosedPath

表示一个多边形

## new Polygon(Array<Point\>) : Polygon ##
用点序列来构造多边形

## getPoints() : Array<Point> ##
获得多边形的点序列


# Line
> inherit: Path

表示一条线段

## setPoint1(Point point) : this ##
设置线段第一个端点的位置

## getPoint1() : Point ##
获取线段第一个端点的位置

## setPoint2(Point point) : this ##
设置线段第二个端点的位置

## getPoint2() : Point ##
获取线段第二个端点的位置


# Curve
> inherit: Path
表示一条曲线

## addPoint(Point point): this ##
添加一个关键点到曲线上

## close(): ClosedPath ##
返回一个闭合的图形

# Polyline
> inherit: Path

## addPoint(Point point): this ##
添加一个折线的顶点

## close(): Ploygon ##
闭合当前折线，返回一个多边形

# Brush #

> inherit: Class
>
> fullname: Kity.Graphic.Brush

根据画刷设置图形背景样式

## get(Shape shape):this ##
获取当前图形画刷

## set(Shape shape):this ##
设置当前图形画刷

# colorBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据纯色画刷设置图形背景

# linearGradientBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据线性渐变画刷设置图形背景

# RadialGradientBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据环形渐变画刷设置图形背景

# BitmapBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据位图画刷设置图形背景

# Pen #

> inherit: Class
>
> fullname: Kity.Graphic.Pen

根据画笔设置当前图形边框样式

## get(Shape shape):this ##
获取当前图形画笔

## set(Shape shape):this ##
设置当前图形画笔

# SolidPen #
> inherit: Class
>
> implement: Graphic.Brush

根据画笔设置图形边框为实线

# DashedPen #
> inherit: Class
>
> implement: Graphic.Brush

根据画笔设置图形边框为虚线

# Filter #

> inherit: Class
>
> fullname: Kity.Graphic.Pen

根据滤镜设置图形滤镜效果

## get(Shape shape):this ##
获取当前图形滤镜

## set(Shape shape):this ##
设置当前图形滤镜

# BlurFilter #
> inherit: Class
>
> implement: Graphic.Brush

设置图形滤镜为模糊

# ShadowFilter #
> inherit: Class
>
> implement: Graphic.Brush

设置图形滤镜为阴影

# Color #
> inherit: Class

图形色值操作

## get(Shape shape):this ##
获取当前图形色值

## set(Shape shape,string value):this ##
设置当前图形色值

## hsb(h,s,b):this ##
转换hsb为hex

## hsb2rgb(h,s,v):this ##
转换hsb为rgb

## hsl(h,s,l):this ##
转换hsl为hex

## hsl2rgb(h,s,l):this ##
转换hsl为rgb

## rgb(h,s,l):this ##
转换rgb为hex

## rgb2hsb(h,s,l):this ##
转换rgb为hsb

## rgb2hsl(h,s,l):this ##
转换rgb为hsl


# Transform #
> inherit: Class

图形变换

## translate(Shape shape,int x,int y):this ##
移动图形

## rotate(Shape shape,int degress,int [cx],int [cy]):this ##
旋转图形
_注:如果cx&&cy没有被指定默认是图形中心_

## scale(Shape shape,int sx,int sy,int [cx],int [cy]):this ##
缩放图形
_注:如果cx&&cy没有被指定默认是图形中心_

## matrix(Shape shape,int a,int b,int c,int d,int e,int f):this ##
根据变换矩阵设置图形
