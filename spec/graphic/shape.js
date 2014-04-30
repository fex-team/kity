/* global kity: true */
describe( "Shape", function () {

    var paper, rect, text;

    describe( 'setAttr', function () {
        text = new kity.Text();

        it( "setAttr/getAttr", function () {
            text.setAttr( 'font-weight', 'bold' );
            expect( text.getAttr( 'font-weight' ) ).toBe( 'bold' );
            text.setAttr( 'font-weight' );
            expect( text.getAttr( 'font-weight' ) ).toBeNull();
            text.setAttr( {
                'font-weight': 'bold',
                'test': 'aaa'
            } );
            expect( text.getAttr( 'font-weight' ) ).toBe( 'bold' );
            expect( text.getAttr( 'test' ) ).toBe( 'aaa' );
            text.setAttr( {
                'font-weight': '',
                'test': ''
            } );
            expect( text.getAttr( 'font-weight' ) ).toBeNull();
            expect( text.getAttr( 'test' ) ).toBeNull();
        } );
    } );

    describe( '图形边界', function () {
        it( '一般情况返回正确图形边界', function () {
            paper = new kity.Paper( document.body );
            paper.setWidth( 50 ).setHeight( 50 );
            rect = new kity.Rect( 30, 30, 10, 10 ).fill( 'yellow' );
            paper.addShape( rect );

            var box = rect.getBoundaryBox();
            expect( box.x ).toBe( 10 );
            expect( box.y ).toBe( 10 );
            expect( box.width ).toBe( 30 );
            expect( box.height ).toBe( 30 );
        } );

        it( '设置不可见返回边界都为 0', function () {
            paper = new kity.Paper( document.body );
            paper.setWidth( 50 ).setHeight( 50 );
            rect = new kity.Rect( 30, 30, 10, 10 ).fill( 'yellow' );
            paper.addShape( rect );
            rect.setVisible( false );

            var box = rect.getBoundaryBox();
            expect( box.x ).toBe( 0 );
            expect( box.y ).toBe( 0 );
            expect( box.width ).toBe( 0 );
            expect( box.height ).toBe( 0 );
        } );
    } );

    describe( '图形变换', function () {
        var b;
        beforeEach( function () {
            paper = new kity.Paper( document.body );
            paper.setWidth( 100 ).setHeight( 100 ).setViewBox( -50, -50, 100, 100 );
            paper.addShape( new kity.Line( -45, 0.5, 45, 0.5 ).stroke( '#ccc' ) );
            paper.addShape( new kity.Line( 0.5, -45, 0.5, 45 ).stroke( '#ccc' ) );
            rect = new kity.Rect( 10, 10, 0, 0 ).fill( 'red' );
            paper.addShape( rect );
        } );
        it( '正确平移', function () {
            rect.setTranslate( 10, 20 );
            b = rect.getRenderBox();
            expect( b.x ).toBe( 10 );
            expect( b.y ).toBe( 20 );
        } );
        it( '正确旋转', function () {
            rect.setWidth( 20 ).setHeight( 10 );
            rect.setRotate( 90 );
            b = rect.getRenderBox();
            expect( b.width ).toBeCloseTo( 10, 5 );
            expect( b.height ).toBeCloseTo( 20, 5 );
        } );
        it( '正确缩放', function () {
            rect.setScale( 1.3, 1.5 );
            b = rect.getRenderBox();
            expect( b.width ).toBeCloseTo( 13 );
            expect( b.height ).toBeCloseTo( 15 );
        } );
        it( '混合使用', function () {
            rect.setScale( 2, 3 ).setTranslate( 10, 10 ).setRotate( 90 );
            b = rect.getRenderBox();
            expect(b.x).toBeCloseTo(-20);
            expect(b.y).toBeCloseTo(10);
            expect(b.width).toBeCloseTo(30);
            expect(b.height).toBeCloseTo(20);
        } );
    } );
} );