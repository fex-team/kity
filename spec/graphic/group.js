describe("Kity.Group", function () {
    var Group = kity.Group, Container = kity.Container;
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