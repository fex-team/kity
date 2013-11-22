getRequires(['graphic/group','graphic/container']);

describe("Kity.Group", function () {
    var Group , Container;
    var group;

    beforeEach(function () {
        Group = src[0], Container = src[1];
        group = new Group();
    });

    it("should be an instance of Shape", function () {
        expect(group instanceof Group).toBeTruthy();
    });

    it("should extend Container", function () {
        expect(group).toImplement(Container);
    });
});