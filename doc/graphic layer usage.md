# Kity 底层库使用场景 #

## * 创建 Paper 并绘制一个矩形 ##

```HTML
<div id="container"></div>
```

```javascript
// 完全链式调用
kity.paper("container")
  .setWidth("800px")
  .setHeight("600px")
  .addShape(
     kity.rect(10, 10, 40, 30)
       .fillBy("red")
   );
```

```javascript
// 面向对象方式
var paper = new Kity.Paper("container");
paper.setWidth("800px");
paper.setHeight("600px"); //这里也支持链式调用

var rect = new Kity.Rect(10, 10, 40, 30);
rect.fillBy("red");
paper.addShape(rect);
```

## * 使用路径绘制平行四边形，并用渐变填充，虚线描边 ##

```javascript
var path = new Kity.Path();
path.moveTo(200, 100);
path.lineTo(400, 100);
path.lineTo(300, 200);
path.lineTo(100, 200);
path.close();

var brush = new Kity.LinearGradientBrush();
brush.setAngle(-90);
brush.addStop(0, "#CCC");
brush.addStop(0.49, "#EEE");
brush.addStop(0.5, "#DDD");
brush.addStop(1, "#EEE");

var pen = new Kity.DashedPen();
pen.setWidth(1);
pen.setColor("black");
pen.setDash(3);

path.fillBy(brush);
path.strokeBy(pen);
```

