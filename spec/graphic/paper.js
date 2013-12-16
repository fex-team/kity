describe("Kity.Paper", function () {
    var EventHandler = kity.Eventhandler, ShapeContainer = kity.Shapecontainer, Paper = kity.Paper;
    var container, paper, node;

    beforeEach(function () {
        container = document.createElement("div");
        paper = new Paper(container);
        document.body.appendChild(container);
        node = container.firstChild;
    });

    it("在容器上创建了 SVG 元素", function () {
        expect(node.tagName.toLowerCase()).toBe('svg');
    });

    it("实现 ShapeContainer", function () {
        expect(paper).toImplement(ShapeContainer);
    });

    it("实现 EventHandler", function () {
        expect(paper).toImplement(EventHandler);
    });

    describe("Paper(string id)", function () {
        it("可以通过容器 id 来创建", function () {
            var container = document.createElement("div");
            container.id = "paper-container";
            document.body.appendChild(container);
            var paper = new Paper('paper-container');
            expect(container.firstChild.tagName.toLowerCase()).toBe('svg');
        });
    });

    describe("getContainer()", function () {
        it("返回容器的引用", function () {
            expect(paper.getContainer()).toBe(container);
        });
    });

    describe("尺寸控制", function () {
        var link;
        beforeEach(function () {
            link = paper.setWidth(100).setHeight(100);
        });
        it("正确设置节点的大小", function () {
            expect(node.getAttribute("width")).toBe('100');
            expect(node.getAttribute("height")).toBe('100');
        });
        it("正确获取节点的大小", function () {
            expect(paper.getWidth()).toBe(100);
            expect(paper.getHeight()).toBe(100);
        });
        it("保持链式调用", function () {
            expect(link).toBe(paper);
        });
    });

    describe("视野控制", function () {
        var rect;
        beforeEach(function () {
            paper.setWidth(800).setHeight(600).setViewBox(-40, -30, 80, 60);
        });

        it("正确地设置了viewBox属性", function () {
            expect(node.getAttribute("viewBox")).toBe('-40 -30 80 60');
        });

        it("正确地解析viewBox属性", function () {
            var box = paper.getViewBox();
            expect(box.x).toBe(-40);
            expect(box.y).toBe(-30);
            expect(box.width).toBe(80);
            expect(box.height).toBe(60);
        });

        it("保证链式调用", function () {
            expect(paper.setViewBox(0, 0, 1, 1)).toBe(paper);
        });
    });
});