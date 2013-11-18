getRequires(["graphic/path"]);
describe("Kity.Path", function () {

    var Path ;
    beforeEach(function() {
        if(Path==undefined)Path = src[0];
    });

    it("无参构造Path", function () {

        var path = new Path();

        expect(path.getPathData()).toBe("");
        expect(path.isClosed()).toBe(false);

    });

    it("带参数构造Path", function () {

        var pathData = "M10 10 H20 V20 H10 Z",
            path = new Path(pathData);

        expect(path.getPathData()).toBe(pathData);
        expect(path.isClosed()).toBe(true);

    });

    it("setPathData()验证", function () {

        var pathData = "M10 10 H20 V20 H10 Z",
            path = new Path();

        expect(path.getPathData()).toBe("");
        path.setPathData(pathData);
        expect(path.getPathData()).toBe(pathData);

    });

    it("setPathData()验证", function () {

        var pathData = "M10 10 H20 V20 H10 Z",
            path = new Path();

        expect(path.getPathData()).toBe("");
        path.setPathData(pathData);
        expect(path.getPathData()).toBe(pathData);

    });

    it("getDrawer()验证", function () {

        var path = new Path();

    });

});