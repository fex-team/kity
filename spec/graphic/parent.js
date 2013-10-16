describe("Kity.Parent", function () {

	describe("getChildren()", function() {
		it("should return a zero-length array when it has no child", function(){

		});

		it("should return all and only its children", function() {

		});
	});

	describe("getChild(int pos)", function() {
		it("should return the child in given position", function() {

		});

		it("should return undefined if no child in given position", function() {

		});
	});

	describe("getFirstChild()", function() {
		it("should return the first child of parent", function() {

		});

		it("should return undefined if parent has no child", function() {

		});
	});

	describe("getLastChild()", function() {
		it("should return the last child of parent", function() {

		});

		it("should return undefined if parent has no child", function() {

		});
	});

	describe("indexOf(object child)", function() {
		it("should return the position of the given child", function() {

		});

		it("should return -1 when the given object is not a child of parent", function() {

		});
	});

	describe("forEachChild()", function() {
		it("shoud interate all and only the children of the parent", function() {

		});

		it("should pass the position and the child to the callback function", function() {

		});

		it("should apply this reference to the parent in the callback function", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("addChild(object child, int pos)", function() {
		it("should add a child to the parent", function() {

		});

		it("should ensure the added child in the given position", function() {

		});

		it("should add the child to last position when position is not given", function() {

		});

		it("should add the child to last position when the given position is illigal", function() {

		});

		it("should add a reference of the parent to the child", function() {

		});

		it("should provide the child a removal method", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("appendChild(object child)", function() {
		it("should add a child as first-child of parent", function() {

		});

		it("should call addChild()", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("prependChild(object child)", function() {
		it("should add a child as last-child of parent", function() {

		});

		it("should call addChild()", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("removeChild(int pos)", function() {
		it("should remove the child in the given position", function() {

		});

		it("should remove the parent reference and the removal method on the child", function() {

		});

		it("should return this reference", function() {

		});
	});

	describe("clear()", function() {
		it("should remove all children of the parent", function() {

		});

		it("should call removeChild() exactaly x times, x is children count before clear", function() {

		});

		it("should return this reference", function() {

		});
	})
});