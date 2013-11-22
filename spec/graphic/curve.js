getRequires(['graphic/shape','graphic/path','graphic/container','graphic/curve']);

describe("Kity.Curve", function () {
    var Shape ,Path ,Container , Curve;
    var curve;
    beforeEach(function () {
        Shape = src[0], Path = src[1], Container = src[2],Curve = src[3];
        curve = new Curve();
    });

    it("should be an instance of Path", function () {
        expect(curve.isInstanceOf(Curve)).toBeTruthy();
    });

    it("should be an instance of Shape", function () {
        expect(curve.isInstanceOf(Shape)).toBeTruthy();
    });

    it("should extend Container", function () {
        expect(curve).toImplement(Container);
    });

    describe("addItem(point [, pos])", function () {
        beforeEach(function () {
            curve.addItem({
                x: 10,
                y: 10
            });
        });
        it("添加点到曲线的关键点集合里", function () {
            expect(curve.getFirstItem()).toMatchPlain({
                x: 10,
                y: 10
            });
        });
        it("curve 的 pathdata 发生了相应的改变", function () {
            expect(curve.getPathData()).toHaveSubString("10 10");
        });
    });

    describe("removeChild(pos)", function () {
        beforeEach(function () {
            curve.addItem({
                x: 10,
                y: 10
            });
            curve.addItem({
                x: 20,
                y: 20
            });
            curve.addItem({
                x: 30,
                y: 30
            });
            curve.removeItem(1);
        });
        it("should remove a key point from the curve in given position", function () {
            expect(curve.getFirstItem()).toMatchPlain({
                x: 10,
                y: 10
            });
            expect(curve.getLastItem()).toMatchPlain({
                x: 30,
                y: 30
            });
        });
    });


});