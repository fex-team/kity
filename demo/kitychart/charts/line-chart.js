var KCLineChart = kity.createClass("lineChart", (function() {
	var p = new kity.Palette();
	p.add('alix-text', new kity.Color('black').inc('l', '50'));
	return {
		constructor: function(data, target) {
			this._paper = new kity.Paper(target);
			this.renderData(data);
		},
		renderData: function(d) {
			var me = this;
			var duraction = 27;
			var _paper = this._paper;
			var renderAxis = function() {
				var _paper = me._paper;
				_paper.setViewBox(0, 0, 500, 300);
				_paper.setWidth(500).setHeight(300);
				var labels = d.axis.cateX;
				_paper.addShape(new kity.Path().pipe(function() {
					var dr = this.getDrawer();
					dr.moveTo(20, 260.5).lineTo(480, 260.5);
					for (var i = 0; i < 18; i++) {
						var vX = 20.5 + i * duraction;
						dr.moveTo(vX, 260).lineTo(vX, 263);
					}
					this.stroke("#C0D0E0", 1);
				}));
				//绘制label
				for (var j = 0; j < 17; j++) {
					var vX = 10.5 + j * duraction;
					var _label = new kity.Text(labels[j]);
					_label
						.setX(vX).setY(280).setSize(5).setStyle("font-family", "Arial").fill(p.get('alix-text'));
					_paper.addShape(_label);
					_label.rotate(-60);
				}
			};
			//根据设定的最大值和最小值绘制折线图
			var renderPolyLine = function(d, base, top) {
				console.log(d);
				//将传入的坐标转换成绘制坐标
				var map = function(step, x, y) {
					var areaY = top - base;
					var mapped_y = 260.5 - ((y - base) * 250 / areaY);
					var mapped_x = 20 + 27 * step + duraction * x / 10;
					return [mapped_x, mapped_y];
				};
				var lineData = d.series;
				var drawingSeries = [];
				for (var i = 0; i < lineData.length; i++) {
					var ld = lineData[i].data;
					drawingSeries.push([]);
					for (var j = 0; j < 17; j++) {
						var step = j;
						for (var k = 0; k < 10; k++) {
							var actualY = ld[j][k];
							var actualX = k;
							var drawingPos = map(step, actualX, actualY);
							drawingSeries[i].push(new kity.Point(drawingPos[0], drawingPos[1]));
						}
					}
				}
				//绘制折线
				console.log(drawingSeries);
				for (var _line = 0; _line < drawingSeries.length; _line++) {
					var line = new kity.Polyline(drawingSeries[_line]);
					//(d.colors[_line] || "red"), 2).setLineJoin("round").setLinecap("round")
					line.stroke(new kity.Pen().setColor(d.colors[_line] || "red").setWidth(2).setLineJoin("round").setLineCap("round"));
					_paper.addShape(line);
				}
			};
			renderAxis();
			renderPolyLine(d, 10000, 20000);
		}
	};
})());