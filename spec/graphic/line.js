var Line = require('graphic/line');
var Paper = require('graphic/paper');
var Path = require('graphic/Path');
var Shape = require('graphic/Shape');
describe("Kity.Line", function () {
    var paper, container;

    beforeEach(function() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        paper = new Paper(container);
        var line = new Line(0, 0, 10, 10);
    });

    it("应该是一个Path实例", function() {
        expect(line instanceof Path).toBeTruthy();
    });

    it("应该是一个Shape实例", function() {
        expect(line instanceof Shape).toBeTruthy();
    });

    it("正确设置了Path.data", function() {
        expect(line.getPathData()).toBe("M0 0 L10 10");
    });

    it("正确获取直线的位置", function() {
        var p1, p2;
        p1 = line.getPoint1();
        p2 = line.getPoint2();
        expect(p1.x).toBe(0);
        expect(p1.y).toBe(0);
        expect(p2.x).toBe(10);
        expect(p2.x).toBe(10);
    });

    describe("setPoint1()", function() {
        it("should set the first point of the line", function() {
            
        });

        it("should return this reference", function() {

        });
    });

    describe("setPoint2()", function() {
        it("should set the second point of the line", function() {

        });

        it("should return this reference", function() {

        });
    });
});