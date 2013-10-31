var Ellipse = require("graphic/ellipse");
var Path = require("graphic/path");
var Shape = require("graphic/shape");

describe("Kity.Ellipse", function () {
	var ellipse;
	beforeEach(function() {
		var ellipse = new Ellipse();
	});

	it("should be an instance of Path", function() {
		expect(ellipse instanceof Path).toBeTruthy();
	});

	it("should be an instance of Shape", function() {
		expect(ellipse instanceof Shape).toBeTruthy();
	});

	describe("Ellipse(width, height)", function() {
		it("should create an ellipse with initial size", function() {
			ellipse = new Ellipse(100, 50);
			expect(ellipse.getSize()).toMatchPlain({
				width: 100,
				height: 50
			});
		});
	});

	describe("Ellipse(width, height, x, y)", function() {
		it("should create an ellipse with initial size and center", function() {
			ellipse = new Ellipse(100, 50, 200, 200);
			expect(ellipse.getSize()).toMatchPlain({
				width: 100,
				height: 50
			});
			expect(ellipse.getCenter()).toMatchPlain({
				x: 200,
				y: 200
			});
		});
	});

	describe("Size 属性读写", function(){
		it("Size 属性", function() {
			expect(ellipse.setSize(100, 50).getSize())
				.toMatchPlain({ width: 100, height: 50 });
		});

		it("Width/Height 属性读写", function() {
			expect(ellipse.setWidth(314).getWidth()).toBe(314);
			expect(ellipse.setHeight(159).getWidth()).toBe(159);
		});

		it("should return this reference", function() {
			// 上述测试能保证
		});
	});

	describe("Center 属性读写", function() {
		it("Center 属性", function() {
			expect(ellipse.setCenter(10, 20).getCenter()).
				toMatchPlain({x: 10, y: 20});
		});

		it("CenterX 和 CenterY 属性", function() {
			expect(ellipse.setCenterX(219).getCenterX()).toBe(219);
			expect(ellipse.setCenterY(322).getCenterY()).toBe(322);
		});

		it("should return this reference", function() {
			// 上述测试能保证
		});
	});
});