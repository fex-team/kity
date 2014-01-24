//getRequires([]);
describe( "ShapeContainer", function () {
    var group = new kity.Group();
    var rect = new kity.Rect();
    var circle = new kity.Circle();
    group.appendShape(rect);
    group.appendShape(circle);
    group.appendShape(new kity.Circle());
    var text = new kity.Text();
    text.appendShape(new kity.TextSpan());
    text.appendShape(new kity.TextSpan());
    group.appendShape(text);
    it( "一层的查询", function () {

        expect(group.getShapesByType('rect').length).toBe(1);
        expect(group.getShapesByType('circle').length).toBe(2);

    } );
    it( "多层的查询", function () {
        expect(group.getShapesByType('textspan').length).toBe(2);
    } );

} );