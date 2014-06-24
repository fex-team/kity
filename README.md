Kity Vector Libary [![Build Status](https://travis-ci.org/fex-team/kity.svg?branch=dev)](https://travis-ci.org/fex-team/kity)
=======

## 简介

Kity 是一个易用、直观、现代的矢量图形库。帮助你快速在页面上创建和使用矢量元素，包括它们的交互、动画以及一些图形工具。

要开始使用 kity，你需要先在页面中引用 `kity.min.js`：

```html
// 引用本地的 kity 库
<script type="text/javascript" src="lib/kity.min.js"></script>


// 使用 git 的 CDN 服务引用
<script type="text/javascript" src="https://cdn.rawgit.com/fex-team/kity/dev/dist/kity.min.js"></script>
```

然后，你就可以在任何的元素上创建 kity 的画布：

```html
<div id="kity_paper"></div>

<script type="text/javascript">
    var paper = new kity.Paper('kity_paper');
    var rect = paper.put(new kity.Rect());
    var text = paper.put(new kity.Text());

    text.setContent('hello kity!');
    text.fill('white');
    text.setX(100);
    text.setY(200);

    rect.setBox(text.getBoundaryBox().expand(-15, -10, 15, 10));
    rect.setRadius(5);
    rect.fill('blue');
</script>
```

![Hello Kity](doc/images/hello-kity.png)

更详细的使用方法请参考 [wiki](https://github.com/fex-team/kity/wiki)。

## 贡献

如果您在使用的过程中发现任何问题，欢迎给我们提 [issue](https://github.com/fex-team/kity/issues)。

如果您是开发者，可以直接给我们提 [Pull Requst](https://github.com/fex-team/pulls)。

## 联系我们

Email: kity@baidu.com