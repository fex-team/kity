var Shape = require('graphic/shape');
var Path = require('graphic/path');
var Container = require('graphic/container');
var Curve = require('graphic/curve');
describe("Kity.Curve", function () {
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
            curve.addChild({
                x: 10,
                y: 10
            });
        });
        it("添加点到曲线的关键点集合里", function () {
            expect(curve.getFirstChild()).toMatchPlain({
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
            curve.addChild({
                x: 10,
                y: 10
            });
            curve.addChild({
                x: 20,
                y: 20
            });
            curve.addChild({
                x: 30,
                y: 30
            });
            curve.removeChild(1);
        });
        it("should remove a key point from the curve in given position", function () {
            expect(curve.getFirstChild()).toMatchPlain({
                x: 10,
                y: 10
            });
            expect(curve.getLastChild()).toMatchPlain({
                x: 30,
                y: 30
            });
        });
    });


})