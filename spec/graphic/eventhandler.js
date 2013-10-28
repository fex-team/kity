var Paper = require('graphic/paper')
var Rect = require('graphic/Rect')
describe("Kity.EventHandler", function () {
    var paper, rect;
    beforeEach(function() {
        paper = new Paper();
        rect = new Rect();
        paper.addShape(rect);
    });
    describe("addEventListener(name, handler)", function() {
        it("能够触发已注册的事件", function() {
            var fired = false;
            rect.addEventListener('click', function(e) {
                fired = true;
                expect(e.targetShape).toBe(rect);
            });
            rect.node.dispatchEvent(new MouseEvent('click'));
            expect(fired).toBeTruthy();
        });
        it("能冒泡到 Parent 上", function() {
            var fired = false;
            paper.addEventListener('click', function(e) {
                fired = true;
                expect(e.targetShape).toBe(rect);
            });
            rect.node.dispatchEvent(new MouseEvent('click'));
            expect(fired).toBeTruthy();
        });

        it("保持链式调用", function() {
            expect(rect.addEventListener('click', function() {} )).toBe(rect);
        });
    });

    describe("removeEventListener(name, handler)"， function() {

        it("取消注册后不触发", function() {
            var fired = false;
            function listener (e) {
                fired = true;
                expect(e.targetShape).toBe(rect);
            }
            rect.addEventListener('click', listener);
            rect.removeEventListener('click', listener);
            rect.node.dispatchEvent(new MouseEvent('click'));
            expect(fired).toBeFalsy();
        });
    })
}); 