describe("Shape", function () {
	it("should extend Kity.EventHandler", function() {

	});

	it("should extend Kity.Styled", function() {

	});

	describe("setId(string id)", function() {
		it("shoud set the id of the shape", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("getId()", function() {
		it("should return the id of the shape", function() {

		});
	});

	describe("getType()", function() {
		it("should return 'Path' when shape is a path", function() {

		});

		it("should return 'Text' when shape is a text", function() {

		});

		it("should return 'Image' when shape is an image", function() {

		});

		it("should return 'Group' when shape is a group", function() {

		});

		it("should return 'Rect' when shape is a rectangle", function() {

		});

		it("should return 'Ellipse' when shape is an ellipse", function() {

		});

		it("should return 'Curve' when shape is a curve", function() {

		});

		it("should return 'Line' when shape is a line", function() {

		});

		it("should return 'Polyline' when shape is a polyline", function() {

		});

		it("should return 'Polygon' when shape is a polygon", function() {

		});
	});

	describe("getX()", function() {
		it("should return the x coordinate of the shape", function() {

		});
	});

	describe("getY()", function() {
		it("should return the y coordinate of the shape", function() {

		});
	});

	describe("getBoundaryBox()", function() {
		it("should return the boundary of the shape", function() {

		});
	});

	describe("getTransform()", function() {
		it("should return a default (zero) transform by default", function() {

		});

		it("should return current transform after a transform is set", function() {

		});

		it("should return the merged transform after a transform is merged", function() {

		});
	});

	describe("setTransform()", function() {
		it("can rotate a shape", function() {

		});

		it("can translate a shape", function() {

		});

		it("can scale a shape", function() {

		});

		it("can skew a shape", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("mergeTransform()", function() {
		it("should apply the transform based on the original transform of the shape", function() {

		});
	});
})