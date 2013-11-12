var Group = require('graphic/group');
var Container = require('graphic/container');

describe("Kity.Group", function () {
    var group;

    beforeEach(function () {
        group = new Group();
    });

    it("should be an instance of Shape", function () {
        expect(group instanceof Group).toBeTruthy();
    });

    it("should extend Container", function () {
        expect(group).toImplement(Container);
    });
});