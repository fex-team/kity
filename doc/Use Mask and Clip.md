## Use(Shape origin)
> 基类：Shape

使用指定的图形，进行个性化设置。可以进行的设置：变换（Transform）、填充（Fill）、描边（Stroke）、样式（Style）。

## Clip()
> 基类：Shape
> 拓展：ShapeContainer

创建图形剪辑。只显示图形剪辑闭合的路径部分。

### Clip.clip(Shape shape)

把剪辑作用在指定的图形上

### Shape.clipWith(Clip clip)

使用指定的剪辑作用在当前图形上

## Mask()
> 基类：Shape
> 拓展：ShapeContainer

创建图形蒙版，蒙版颜色亮度为 100 的部分，被蒙版的图形能被完全显示，而蒙版颜色亮度为 0 的部分，被蒙版的图形透明度为 0。

### Mask.mask(Shape shape) : this

把蒙版作用在指定的图形上

### shape.maskWith(Mask mask) : this

使用指定的蒙版作用在当前图形

> Clipe 和 Mask 的差别：https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking