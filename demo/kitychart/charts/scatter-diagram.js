var KCScatterDiagram = kity.createClass("scatterDiagram", (function() {
	var p = new kity.Palette();
	p.add('alix-text', new kity.Color('black').inc('l', '50'));
	return {
		constructor: function(data, target) {
			this._paper = new kity.Paper(target);
			this.renderData(data);
		},
		renderData: function(d) {
			var me = this;
			var _paper = this._paper;
			_paper.setViewBox(0, 0, 500, 300);
			_paper.setWidth(500).setHeight(300);
			var renderAxis = function() {
				_paper.addShape(new kity.Path().pipe(function() {
					var dr = this.getDrawer();
					dr.moveTo(50, 260.5).lineTo(480, 260.5);
					dr.moveTo(50.5, 260).lineTo(50.5, 10);
					var dX = 50;
					var dY = 50;
					for (var i = 0; i < 9; i++) {
						var curX = 50 + i * dX + 0.5;
						dr.moveTo(curX, 260).lineTo(curX, 263);
						if (i % 2 !== 0) {
							continue;
						}
						var txtX = (new kity.Text(d.axis.cateX[i / 2])).fill(p.get('alix-text'));
						txtX.setStyle('font-family', 'Arial');
						txtX.setSize(9);
						_paper.addShape(txtX);
						var _txtWidthX = txtX.shapeNode.clientWidth;
						txtX.setY(280);
						txtX.setX(curX - _txtWidthX / 2);
					}
					for (var j = 0; j < 5; j++) {
						var curY = 260 - j * dY + 0.5;
						dr.moveTo(50, curY).lineTo(47, curY);
						var txtY = (new kity.Text(d.axis.cateY[j])).fill(p.get('alix-text'));
						txtY.setStyle('font-family', 'Arial');
						txtY.setSize(9);
						_paper.addShape(txtY);
						var _txtWidthY = txtY.shapeNode.clientWidth;
						txtY.setY(curY + 5);
						txtY.setX(10);
					}
					this.stroke("#C0D0E0", 1);
				}));
			};
			var renderLine = function(x1, y1, x2, y2, color, dasharray) {
				var Line = new kity.Line(x1, y1, x2, y2);
				//if (dasharray) Line.setDashArray(dasharray);
				Line.stroke(new kity.Pen().setColor(color).setDashArray(dasharray));
				me._paper.addShape(Line);
			};
			var addDot = function(dot) {
				var Round = new kity.Group();
				var vX = 130 + dot.x * 200,
					vY = 260.5 - (40 + dot.y * 100);
				//draw circle
				var circle = new kity.Circle(dot.r, vX, vY);
				circle.stroke(dot.color, 2).fill("white");
				//draw percent
				var pie = new kityPie(0, dot.r, 0, dot.percent * 360, vX, vY);
				pie.fill(dot.color);
				var label_val = new kity.Text((dot.percent * 100).toFixed(2) + "%");
				label_val
					.fill("black").setX(vX).setY(vY).setSize(dot.r / 6).setStyle('font-family', 'Arial');
				var label = new kity.Text(dot.label);
				label.fill(dot.color).setSize(9).setX(vX + dot.r).setY(vY - 12);
				Round.addShape(circle);
				Round.addShape(pie);
				Round.addShape(label_val);
				Round.addShape(label);
				Round.setOpacity(0.9);
				me._paper.addShape(Round);
			};
			renderAxis();
			renderLine(50, 260, 480, 10, "#666");
			renderLine(50, 100.5, 480, 100.5, "#666", [5, 2]);
			var dots = d.data.series;
			for (var i = 0; i < dots.length; i++) {
				addDot(dots[i]);
			}
		}
	};
})());

console.log(KCScatterDiagram);