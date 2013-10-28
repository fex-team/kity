# Kity Graphic Layer API #

## Serializable ###
> 接口

表示一个类的实例是可序列化和反序列化的。如果一个类是可序列化的，那么在所有使用该类型的参数中，都可以使用字符串表示。

### toString() : string ###
返回当前实例的完整字符串表示

### parse(object data) : this ###
从给定的数据（字符串、数字、JSON等，取决于实现的类型）表示反序列化自身





## Point ##
> 数据契约（JSON 格式）

表示一个点，结构如下：

```javascript
{
    x : <float>,
    y : <float>
}
```





## Size ##
> 数据契约（JSON 格式）

表示一个尺寸，结构如下：

```
{
    width : <float>,
    height : <float>
}
```




## Parent ##
> 功能拓展

提供一个容器功能

### getChildren() : Array ###
获得容器中所有的子元素

### getChild(int pos) : object ###
获得指定位置的子元素

### getFirstChild() : object ###
获得首个子元素

### getLastChild() : object ###
根据 CSS Class 获得指定的图形集合

### indexOf(object child) : int ###
获取指定子元素的位置，如果不存在则返回 -1

### forEachChild(Function fn) : this ###
迭代每个子元素

### addChild(object child, int pos) : this ###
添加子元素到指定的位置

### appendChild(object child) : this ###
追加子元素到指定的位置

### prependChild(object child) : this ###
添加子元素到最前头的位置

### removeChild(int pos) : this ###
删除指定位置的子元素

### clear() : this ###
清除容器中所有的子元素

### Child.remove() ###
子元素从容器移除自身

### Child.parent ###
子元素获得包含自身的容器





## EventHandler ##
> 功能拓展

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
> 基类 : Parent
> 实现 : EventHandler
> 所有图形的

### Paper(HTMLElement container) : Paper ###
构造函数，给定父容器 Dom，在父容器上创建 Paper 和呈现

### Paper(string id) : Paper ###
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






## Styled ##
> 功能拓展

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
> 抽象类
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

### getPosition() : Point ###
获得图形的位置

### setX(float x) : this ###
设置图形的 x 坐标

### setY(float y) : this ###
设置图形的 y 坐标

### setPosition(float x, float y) ###
设置图形的位置

### getWidth() : int ###
获取图形的宽度

### getHeight() : int ###
返回图形的高度

### getSize() : Size ###
返回图形的大小

### getBoundaryBox() : Box ###
获得图形的边界

### getTransform() : Matrix
获取图形当前的变换矩阵

### setTransform(Matrix matrix) : this ###
设置图形的变换矩阵

### mergeTransform(Matrix matrix) : this ###
合并图形的变换矩阵

### *addFilter(Filter filter) : this ###
添加滤镜

### *removeFilter(Filter filter) : this ###
删除滤镜






## Path ##
> 基类 : Shape

表示一个路径（闭合或不闭合）

### Path() : Path ###
构造函数，创建一条空路径

### Path(string data): Path ###
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

### besierBy(dx1, dy1, dx2, dy2, dx, dy) : this ###
绘制贝塞尔曲线（相对位置）

### close() : this ###
闭合当前路径

### isClosed() : bool ###
判断当前路径是否已闭合

### stroke(Pen pen) : this ###
用指定的画笔描边路径

### fill(Brush brush) : this ###
用指定的画刷填充路径








## Group
> 基类 : Shape
> 实现 : Parent
 
将多个图形组合成新的图形，请参照 Parent

## Group() ##
构造函数创建一个空的组






## Rect
> 基类 : Path

表示一个矩形

### Rect(float width, float height) : Rect ###
构造函数，给定矩形的大小

### Rect(float width, float height, float x, float y) : Rect ###
构造函数，给定矩形的大小和位置

### setWidth(float width) : this ###
设置矩形的宽度

### setHeight(float height) : this ###
设置矩形的高度

### setSize(float width, float height) ###
设置矩形的大小

### getRadius() : float #####
获得矩形的圆角大小

### setRadius(float radius) : this ###
设置矩形的圆角大小






## Ellipse
> 基类 : Path

表示一个椭圆

### Ellipse(float width, float height) ###
快捷构造椭圆，给定椭圆的大小

### Ellipse(float x, float y, float width, float height) ###
快速构造椭圆，给定椭圆的位置和大小

### setWidth(float width) : this ###
设置椭圆的宽度

### setHeight(float height) : this ###
设置椭圆的高度

### setSize(float width, float height) : this ###
设置椭圆的大小






## Polygon
> 基类 : Path
> 实现 : Parent

表示一个多边形，其子元素表示其顶点序列

### Polygon() : Polygon ###
构造函数，创建一个空多边形

### Polygon(Array<Point>) : Polygon ###
用点序列来构造多边形






## Line
> 基类 : Path

表示一条线段

### Line(float x1, float y1, float x2, float y2) ###
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
> 实现 : Parent

表示一条曲线，其子元素表示其经过的点序列

### Curve() : Curve ###
构造函数，初始化一条曲线

### Curve(Array<Points> points) : Curve ###
快捷构造函数，给定曲线经过的点






## Polyline ##
> 基类 : Path
> 实现 : Parent

表示一条折线，其子元素是其顶点

### Polyline() : Polygon ###
构造函数，创建空折线

### Polyline(Array<Point>) : Polygon ###
用点序列来创建折线





## Image ##
> 基类 : Shape

用于显示图片

### Image(string url) : Image ###

### setUrl(string url) : this ###
设置图片的 URL

### getUrl() : string
获取图片的 URL






## Text ##
> 基类 : Shape
> 实现 : Parent

用于显示文字，其子元素为单独控制样式的 TextSpan

### Text() : Text ###
创建一个空的文本

### Text(string content) : Text ###
创建一个具有指定内容的文本

### setContent(string content) : this ###
设置文本内容

### getContent() : string
获得文本内容

### setPath(string pathdata) : ###
设置文本的排列路径






## TextSpan ##
> 基类 : Class
> 实现 : Styled

内联文本块

### TextSpan(string content) ###
创建具有指定内容的文本框

### setContent(string content) ###
设置文本块内容

### getContent() : string ###
获得文本块内容







## Color ##
> 基类 : Class
> 实现 : Serializable

表示一个颜色

### Color() : this ###
初始化一个颜色

### set(string name, float value) : this
设置当前颜色的某一个分量值，支持：

* r/red - RGB 颜色表示中的红色分量（取值0-255）
* g/green - RGB 颜色表示中的绿色分量（取值0-255）
* b/blue - RGB 颜色表示中的蓝色分量（取值0-255）
* h/hue - HSL 颜色表示中的色环角度（取值0-360）
* s/saturation - HSL 颜色表示中的饱和度（取值0-100）
* l/lightness - HSL 颜色表示中的亮度（取值0-100）
* a/alpha - 颜色的透明度（取值0 - 1）

设置 RGB 的分量会影响 HSL 的分量，反之亦然。

### increase(string name, float inc) ###
增加当前颜色某个分值的值，如果溢出，会设置为对应的最大值

### decrease(string name, float dsc) ###
减少当前颜色某个分值的值，如果溢出，会这职位对应的最小值

### get(string name) : this ###
获取当前颜色的某一个分量值，支持的名称和set方法中规定一致

### toRGB() : string ###
获得当前颜色的 RGB 表示： RGB(r, g, b)，这种表示形式会丢失颜色的透明度信息

### toHEX() : string ###
获得当前颜色的 HEX 表示: #RRGGBB，这种表示形式会丢失颜色的透明度信息

### toHSL() : string ###
获得当前颜色的 HSL 表示: HSL(h, s%, l%)，这种表示形式会丢失颜色的透明度信息

### toRGBA() : string ###
获得当前颜色的 RGBA 表示: RGBA(r, g, b, a)

### toHSLA() : string ###
获得当前颜色的 HSLA 表示：HSLA(h, s%, l%, a)








## Brush ##
> 基类 : Class
> 抽象类
> 实现 : Serializable

表示一个画刷，用于填充 Path

### getType() : string ###
获取画刷的类型








# ColorBrush #
> 基类: Brush

表示一个用纯色填充的画刷

### ColorBursh() ###
构造函数，初始化一个纯色填充的画刷

### ColorBrush(Color color) : this ###
构造函数，使用指定的颜色初始化画刷

### setColor(Color color) : this ###
设置画刷颜色

### getColor() : Color ###
获取画刷的颜色








# LinearGradientBrush #
> 基类 : Brush

表示用线性渐变填充的画刷。线性渐变的方向和大小由两个值决定。起始位置和结束，使用(px, py)来表示，取值0 - 1，表示渐变的开始和结束位置在图形的指定比例处。默认是 (0,0) 和 (0, 1)
渐变的颜色通过添加 ColorStop 来指定

### LinearGradientBrush() : this ###
初始化线性渐变画刷

### setStartPosition(float px, float py) ###
设置渐变起始位置

### setEndPosition(float px, float py) ###
设置渐变结束位置

### getStartPosition() : Point ###
获取渐变起始位置

### getEndPosition() : Point ###
获取渐变结束位置

### addStop(float pos, Color color) : this ###
设置指定位置上的颜色，pos取值范围为 0 - 1，表示在渐变区间的比例的颜色






# RadialGradientBrush #
> 基类 : Brush

表示用径向渐变填充的画刷。径向渐变用三个值表示。中心位置和半径表示其范围，都用 0 - 1 作为值域。焦点表示径向渐变的起始位置。

### RadialGradientBrush() : this ###
初始化一个径向填充的画刷

### setCenter(float cx, float cy) ###
设置径向渐变的中心位置

### getCenter() : Point ###
获得径向渐变的中心位置

### setFocal(float fx, float fy) : this ###
设置径向渐变的焦点位置

### getFocal() : Point ###
获取线性渐变的焦点位置

### addStop(float pos, Color color) : this ###
设置渐变指定区间位置的颜色，取值范围 0 - 1







# ImageBrush #
> 基类 : Brush

表示用位图填充的画刷

### ImageBrush(string url) : this ###
初始化一个位图画刷，指定位图位置

### setUrl(string url) : this ###
设置画刷位图的 URL

### getUrl() : string ###
获取画刷的位图 URL






## Pen ##
> 基类 : Class
> 抽象类
> 实现 : Serializable

根据画笔设置当前图形边框样式

### getColor() : Color ###
获取当前图形画笔色值

### getWidth() : float ###
获取当前图形画笔粗细

### setColor(Color color) : this ###
设置当前图形画笔颜色

### setWidth(float width) : this ###
设置当前图形画笔的粗细






## SolidPen ##
> 基类 : Pen

绘制实线描边的画笔

### SolidPen(Color color, float size) : this ###
用初始的颜色和大小创建实线画笔






## DashedPen ##
> 基类 : Pen

绘制虚线描边的画笔

### DashedPen(Color color, float size [, float dash [, float space]]) : this ###
创建指定颜色和大小的虚线画笔，也可以可选指定虚线的段长和间隔长度

### setDash(float dash) : this ###
设置虚线的段长

### getDash() : float ###
获取虚线的段长

### setSpace(float space) : this ###
设置虚线段之间的间隔长度

### getSpace() : float ###
获取虚线段之间的间隔长度






## Filter ##
> 基类 : Class
> 实现 : Serializable

表示一个应用到图形上的滤镜






## BlurFilter ##
> 基类 : Filter

设置图形滤镜为模糊

### BlurFilter(int blur) : this ###
创建一个滤镜

### setBlurFilter(int blur):this ###
设置当前图形滤镜模糊值

### getBlurFilter():this ###
获取当前图形滤镜模糊值






## ShadowFilter ##
> inherit: Class
>
> implement: Kity.Brush

设置图形滤镜为阴影

### getShadowFilterOffset():this ###
获取当前图形滤镜偏移

### setShadowFilterOffset(int x,int y):this ###
设置当前图形滤镜偏移

### getShadowFilterBlur():this ###
获取当前图形滤镜模糊值

### setShadowFilterBlur(int blur):this ###
设置当前图形滤镜模糊值

### getShadowFilterBlur():this ###
设置当前图形滤镜模糊值

### setShadowFilteColor(string color):this ###
设置当前图形滤镜颜色







## Matrix ##
> 基类 : Class
> 实现 : Serializable

图形变换

### getTranslate() : Point ###
获取当前矩阵表示的平移量

### setTranslate(int x, int y) : this ###
设置矩阵的平移量

### getRotate() : float ###
获取矩阵表示的旋转角度（deg）

### setRotate(int degress) : this ###
设置矩阵表示的旋转角度

### getScaleX() : float ###
获取矩阵表示的X缩放比例

### getScaleY() : float
设置矩阵表示的Y缩放比例

### setScale(float sx, float sy) : this ###
设置矩阵表示的缩放比例

### setAnchor(float x, float y) : this ###
设置矩阵应用的旋转锚点

### getAnchor() : Point ###
获取矩阵应用的旋转锚点

### getMatrix() : Plain ###
获取矩阵的数据： { a: float, b: float, c: ...}

### setMatrix(float a, float b, float c, float d, float e, float f): this ###
设置矩阵的数据

### merge(Matrix another) : Matrix ###
合并另一个转换矩阵，返回合并后的矩阵