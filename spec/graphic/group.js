var Group = require('graphic/group');
var Parent = require('graphic')

describe("Kity.Group", function () {
    var group;

    beforeEach(function() {
        group = new Group();
    });

	it("should be an instance of Shape", function() {
		expect(group instanceof Group).toBeTruthy();
	});

	it("should extend parent", function() {
		expect(group).toImplement(Parent);
	});
});