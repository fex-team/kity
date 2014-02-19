//getRequires([]);
describe( "Shape", function () {
    describe('setAttr',function(){
        var text = new kity.Text();

        it( "setAttr/getAttr", function () {
            text.setAttr('font-weight','bold');
            expect(text.getAttr('font-weight')).toBe('bold');
            text.setAttr('font-weight');
            expect(text.getAttr('font-weight')).toBeNull();
            text.setAttr({
                'font-weight':'bold',
                'test':'aaa'
            });
            expect(text.getAttr('font-weight')).toBe('bold');
            expect(text.getAttr('test')).toBe('aaa');
            text.setAttr({
                'font-weight':'',
                'test':''
            });
            expect(text.getAttr('font-weight')).toBeNull();
            expect(text.getAttr('test')).toBeNull();
        } );
    });

    describe('getRenderBox()', function() {
        it( '默认获取相对父亲的渲染盒子', function() {
            var paper = new kity.Paper(document.body);
            var group = new kity.Group();
            var rect = new kity.Rect(200, 100, 20, 10);
            paper.addShape(group);
            group.addShape(rect);

            var box = rect.getRenderBox();
            expect(box.x).toBe(20);
            expect(box.y).toBe(10);
            expect(box.width).toBe(200);
            expect(box.height).toBe(100);

            group.translate(10, 10);
            expect(box.x).toBe(20);
            expect(box.y).toBe(10);
            expect(box.width).toBe(200);
            expect(box.height).toBe(100);
        } );
        it( '给定容器获得相对于容器父亲的渲染盒子', function() {
            var paper = new kity.Paper(document.body);
            var group = new kity.Group();
            var rect = new kity.Rect(200, 100, 20, 10);
            paper.addShape(group);
            group.addShape(rect);

            var box = rect.getRenderBox();
            expect(box.x).toBe(20);
            expect(box.y).toBe(10);
            expect(box.width).toBe(200);
            expect(box.height).toBe(100);

            group.translate(10, 10);
            box = rect.getRenderBox(group);
            expect(box.x).toBe(30);
            expect(box.y).toBe(20);
            expect(box.width).toBe(200);
            expect(box.height).toBe(100);
        } );

        it( '给定容器获得相对于容器父亲的渲染盒子(多级)', function() {
            var paper = new kity.Paper(document.body);
            var group1 = new kity.Group();
            var group2 = new kity.Group();
            var rect = new kity.Rect(200, 100, 20, 10);
            paper.addShape(group1);
            group1.addShape(group2);
            group2.addShape(rect);

            group1.setAnchor(0, 0).scale(2, 2);
            group2.translate(10, 10);

            var box = rect.getRenderBox(group1);
            expect(box.x).toBe(60);
            expect(box.y).toBe(40);
            expect(box.width).toBe(400);
            expect(box.height).toBe(200);

        } );

        it('给定"top"为参数获得相对于 paper 的渲染盒子', function() {
            var paper = new kity.Paper(document.body);
            var group1 = new kity.Group();
            var group2 = new kity.Group();
            var rect = new kity.Rect(200, 100, 20, 10);
            paper.addShape(group1);
            group1.addShape(group2);
            group2.addShape(rect);

            group1.setAnchor(0, 0).scale(2, 2);
            group2.translate(10, 10);

            var box = rect.getRenderBox('top');
            expect(box.x).toBe(60);
            expect(box.y).toBe(40);
            expect(box.width).toBe(400);
            expect(box.height).toBe(200);
        });
    });


} );