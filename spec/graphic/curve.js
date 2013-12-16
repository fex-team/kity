describe("Kity.Curve", function () {
    var Shape = kity.Shape,Path = kity.Path,Container = kity.Container, Curve = kity.Curve, Point = kity.Point
    var curve;
    beforeEach(function () {
        curve = new Curve();
    });

    it("should be an instance of Path", function () {
        expect(curve instanceof Curve).toBeTruthy();
    });

    it("should be an instance of Shape", function () {
        expect(curve instanceof Shape).toBeTruthy();
    });

    it("should extend Container", function () {
        expect(curve).toImplement(Container);
    });

    describe("addItem(point [, pos])", function () {
        beforeEach(function () {
            curve.addPoint(new Point(10, 10));
        });
        it("添加点到曲线的关键点集合里", function () {
            expect(curve.getFirstItem().getX()).toBe(10);
            expect(curve.getFirstItem().getY()).toBe(10);
        });
        it("curve 的 pathdata 发生了相应的改变", function () {
            expect(curve.getPathData()).toHaveSubString("10 10");
        });
    });

    describe("removeChild(pos)", function () {
        beforeEach(function () {
            curve.addPoint(new Point(10, 10));
            curve.addPoint(new Point(20, 20));
            curve.addPoint(new Point(30, 30));
            curve.removePoint(1);
        });
        it("should remove a key point from the curve in given position", function () {
            expect(curve.getFirstPoint().getX()).toBe(10);
            expect(curve.getFirstPoint().getY()).toBe(10);
            expect(curve.getLastPoint().getX()).toBe(30);
            expect(curve.getLastPoint().getY()).toBe(30);
        });
    });


});