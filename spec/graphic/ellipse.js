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

	describe("Ellipse(radiusX, radiusY)", function() {
		it("should create an ellipse with initial size", function() {
			ellipse = new Ellipse(100, 50);
			expect(ellipse.getRadiusX()).toBe(100));
			expect(ellipse.getRadiusY()).toBe(50));
			expect(ellipse.getCenterX()).toBe(0);
			expect(ellipse.getCenterY()).toBe(0);			
		});
	});

	describe("Ellipse(radiusY, radiusY, x, y)", function() {
		it("should create an ellipse with initial size and center", function() {
			ellipse = new Ellipse(100, 50, 200, 200);
			expect(ellipse.getRadiusX()).toBe(100));
			expect(ellipse.getRadiusY()).toBe(50));
			expect(ellipse.getCenterX()).toBe(0);
			expect(ellipse.getCenterY()).toBe(0);	
		});
	});

	describe("Radius 属性读写", function(){
		it("Radius 属性", function() {
			expect(ellipse.setRadius(100, 50).getRadius())
				.toMatchPlain({ x: 100, y: 50 });
		});

		it("RadiusX/RadiusY 属性读写", function() {
			expect(ellipse.setRadiusX(314).getRadiusX()).toBe(314);
			expect(ellipse.setRadiusY(159).getRadiusY()).toBe(159);
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