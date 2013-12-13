describe("Kity.Pen", function() {
    var Pen = kity.Pen, Color = kity.Color;
    var pen;
    beforeEach(function() {
        pen = new Pen(Color.parse('#123'), 1);
    });

    it('保存了正确的颜色值', function() {
        expect(pen.getColor() instanceof Color).toBeTruthy();
        expect(pen.getColor().toHEX()).toBe('#112233');
    });

    it('保存了正确的宽度值', function() {
        expect(pen.getWidth()).toBe(1);
    });

    it('设置颜色值', function() {
        expect(pen.setColor(Color.parse('#456')).getColor().toHEX()).toBe('#445566');
    });

    it('设置宽度值', function() {
        expect(pen.setWidth(2).getWidth()).toBe(2);
    });

    it('设置端点样式', function() {
        expect(pen.setLineCap('round').getLineCap()).toBe('round');
    });

    it('设置转折点样式', function() {
        expect(pen.setLineJoin('round').getLineJoin()).toBe('round');
    });

    it('默认 dasharray 为 null', function() {
        expect(pen.getDashArray()).toBe(null);
    });

    it('设置 dasharray', function() {
        expect(pen.setDashArray([3,4]).getDashArray().join(',')).toBe('3,4');
    });
});