describe("Kity.Rect", function() {

    var Rect = kity.Rect,
        Paper = kity.Paper,
        Color = kity.Color,
        ColorBrush = kity.ColorBrush;
    var rect, paper;

    var color;

    beforeEach(function() {

        color = Color.parse('hsl(0, 80, 50)');
        rect = new Rect(100, 50, 10, 20);
        if (!paper) {
            paper = new Paper(document.body.appendChild(document.createElement('div')));
        }
        paper.addItem(rect.fill(color.inc('h', 90)));
    });

    it("给定初始位置和宽高构造Rect", function() {

        expect(rect.getWidth()).toBe(100);
        expect(rect.getHeight()).toBe(50);
        expect(rect.getPosition().x).toBe(10);
        expect(rect.getPosition().y).toBe(20);

    });

    it("setWidth和setHeight接口测试", function() {

        rect.setWidth(500).setHeight(300);

        expect(rect.getWidth()).toBe(500);
        expect(rect.getHeight()).toBe(300);

    });

    it("圆角接口测试", function() {

        rect.setRadius(5);

        expect(rect.getRadius()).toBe(5);

    });

    it("位置接口测试", function() {

        expect(rect.getPositionX()).toBe(10);
        expect(rect.getPositionY()).toBe(20);

        rect.setPositionX(50);
        rect.setPositionY(150);

        expect(rect.getPositionX()).toBe(50);
        expect(rect.getPositionY()).toBe(150);

        expect(rect.getPosition().x).toBe(50);
        expect(rect.getPosition().y).toBe(150);

    });

});