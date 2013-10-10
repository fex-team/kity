## Class ##
> inherit: Object
>
> fullname: Kity.Class

所有类的基类

## Brush ##

> inherit: Class
>
> fullname: Kity.Graphic.Brush

根据画刷设置图形背景样式

### get():this ###
获取当前图形画刷

### set():this ###
设置当前图形画刷

# ColorBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据纯色画刷设置图形背景

# LinearGradientBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据线性渐变画刷设置图形背景

# RadialGradientBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据环形渐变画刷设置图形背景

# ImageBrush #
> inherit: Class
>
> implement: Graphic.Brush

根据位图画刷设置图形背景

---

## Pen ##

> inherit: Class
>
> fullname: Kity.Graphic.Pen

根据画笔设置当前图形边框样式

### get():this ###
获取当前图形画笔

### setColor(string color):this ###
设置当前图形画笔颜色

### setWidth(int size):this ###
设置当前图形画笔大小

## SolidPen ##
> inherit: Class
>
> implement: Graphic.Brush

根据画笔设置图形边框为实线

## DashedPen ##
> inherit: Class
>
> implement: Graphic.Brush

根据画笔设置图形边框为虚线

---

## Filter ##
> inherit: Class
>
> fullname: Kity.Graphic.Pen

根据滤镜设置图形滤镜效果

### get():this ###
获取当前图形滤镜

### set():this ###
设置当前图形滤镜

## BlurFilter ##
> inherit: Class
>
> implement: Graphic.Brush

设置图形滤镜为模糊

## ShadowFilter ##
> inherit: Class
>
> implement: Graphic.Brush

设置图形滤镜为阴影

---

## Color ##
> inherit: Class

图形色值操作

### get():string ###
获取当前图形色值

### set(String value):string ###
设置当前图形色值

### [Static]hsb(h,s,b):string ###
转换hsb为hex

### [Static]hsb2rgb(h,s,v):string ###
转换hsb为rgb

### [Static]hsl(h,s,l):string ###
转换hsl为hex

### [Static]hsl2rgb(h,s,l):string ###
转换hsl为rgb

### [Static]rgb(h,s,l):string ###
转换rgb为hex

### [Static]rgb2hsb(h,s,l):string ###
转换rgb为hsb

### [Static]rgb2hsl(h,s,l):string ###
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

