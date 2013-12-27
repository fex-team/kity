var KCLineChart = kity.createClass("lineChart", (function() {
	var p = new kity.Palette();
	p.add('alix-text', new kity.Color('black').inc('l', '50'));
	return {
		constructor: function(data, target) {
			this._paper = new kity.Paper(target);
			this.renderData(data);
			this.interact(data);
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
					dr.moveTo(20, 250.5).lineTo(480, 250.5);
					for (var i = 0; i < 18; i++) {
						var vX = 20.5 + i * duraction;
						dr.moveTo(vX, 250).lineTo(vX, 253);
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
				//将传入的坐标转换成绘制坐标
				var map = function(step, x, y) {
					var areaY = top - base;
					var mapped_y = 260.5 - ((y - base) * 250 / areaY);
					var mapped_x = 20 + 27 * step + duraction * x / 10;
					return [mapped_x, mapped_y];
				};
				var lineData = d.series;
				var drawingSeries = me.drawingSeries = [];
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
				for (var _line = 0; _line < drawingSeries.length; _line++) {
					var line = new kity.Polyline(drawingSeries[_line]);
					//(d.colors[_line] || "red"), 2).setLineJoin("round").setLinecap("round")
					line.stroke(new kity.Pen().setColor(d.colors[_line] || "red").setWidth(2).setLineJoin("round").setLineCap("round"));
					_paper.addShape(line);
				}
			};
			renderAxis();
			renderPolyLine(d, 10000, 20000);
		},
		interact: function(data) {
			var xRuler = new kity.Line(0, 0, 0, 250).stroke('orange').translate(-10);
			this._paper.addShape(xRuler);
			var pointIndex = (function(origin) {
				var series = [];
				for (var i = 0; i < origin.length; i++) {
					for (var j = 0; j < origin[i].length; j++) {
						var p = origin[i][j];
						series[j] = series[j] || [p.getX()];
						series[j].push(p.getY());
					}
				}
				return series;
			})(this.drawingSeries);

			function mid(i, j) {
				return (i + j) >> 1;
			}

			function findNearestPoint(x) {
				var i = 0,
					j = pointIndex.length - 1,
					m = mid(i, j);
				while (i < j - 1) {
					if (x > pointIndex[m][0]) {
						i = m;
					} else {
						j = m;
					}
					m = mid(i, j);
				}
				return pointIndex[m];
			}

			var iDots = [];
			for (var i = 0; i < data.colors.length; i++) {
				var circle = new kity.Circle(3, 0, 0).translate(-10).fill(new kity.Color(data.colors[i]).dec('l', 20));
				iDots.push(circle);
				this._paper.addShape(circle);
			}

			var lastUpdateTs = 0;

			function updatePosition(e) {
				if (+new Date() - lastUpdateTs < 16) {
					return;
				}
				var x = e.getPosition().x;
				x = Math.max(20, Math.min(480, x));
				var points = findNearestPoint(x);
				x = points[0];
				xRuler.setTransform(new kity.Matrix().translate(x, 0));
				for (var i = 1; i < points.length; i++) {
					iDots[i - 1].setTransform(new kity.Matrix().translate(x, points[i]));
				}
				e.preventDefault();
				lastUpdateTs = +new Date();
			}
			if (window.ontouchstart !== undefined) {
				this._paper.on('touchstart touchmove', updatePosition);
			} else {
				this._paper.on('mousemove', updatePosition);
				var on = true;
				var paper = this._paper.on('click', function(e) {
					if (on) {
						paper.off('mousemove', updatePosition);
					} else {
						updatePosition(e);
						paper.on('mousemove', updatePosition);
					}
					on = !on;
				});
			}
		}
	};
})());