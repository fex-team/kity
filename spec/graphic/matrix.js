describe("Kity.Matrix", function () {
    var Matrix = kity.Matrix;
    var matrix;
    beforeEach(function() {
        matrix = new Matrix();
    });

    it('默认值正确', function() {
//        expect(matrix.toString()).toBe('matrix(1, 0, 0, 1, 0, 0)');
//        expect(matrix.getTranslate()).toMatchPlain({x: 0, y: 0});
//        expect(matrix.getRotate()).toBe(0);
//        expect(matrix.getScaleX()).toBe(0);
//        expect(matrix.getScaleY()).toBe(0);
    });
//
//    it('Translate 行为正确', function() {
//        matrix.setTranslate(10, 20);
//        expect(matrix.getTranslate()).toMatchPlain({
//            x: 10,
//            y: 20
//        });
//        expect(matrix.toString()).toBe('matrix(0, 0, 10, 0, 0, 20)');
//    });
//
//    it('Scale 行为正确', function() {
//        matrix.setScale(1.2, 0.8);
//        expect(matrix.getScaleX()).toBe(1.2);
//        expect(matrix.getScaleY()).toBe(0.8);
//        expect(matrix.toString()).toBe('matrix(1.2, 0, 0, 0.8, 0, 0)');
//    });
//
//    it('Rotate 行为正确', function() {
//        matrix.setRotate(30);
//        expect(matrix.getRotate()).toBe(30);
//        var value = matrix.getMatrix();
//        var sin = Math.sin(Math.PI / 6),
//            cos = Math.cos(Math.PI / 6);
//        expect(value.a).toBeCloseTo(cos, 6);
//        expect(value.b).toBeCloseTo(sin, 6);
//        expect(value.c).toBeCloseTo(-sin, 6);
//        expect(value.d).toBeCloseTo(cos, 6);
//        expect(value.e).toBe(0);
//        expect(value.f).toBe(0);
//    });
});