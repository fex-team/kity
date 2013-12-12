getRequires(['graphic/paper','graphic/shape' ,'graphic/path','graphic/line']);

describe( "Kity.Line", function () {
    var Paper , Shape , Path,Line ;
    var paper, container, line;

    beforeEach( function () {
        Paper = src[0] , Shape =src[1] , Path = src[2],Line = src[3];
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        paper = new Paper( container );
        line = new Line( 0, 0, 10, 10 );
    } );

    it( "应该是一个Path实例", function () {
        expect( line instanceof Path ).toBeTruthy();
    } );

    it( "应该是一个Shape实例", function () {
        expect( line instanceof Shape ).toBeTruthy();
    } );

    it( "正确设置了Path.data", function () {
        expect( line.getPathData() ).toBe( "M 0 0 L 10 10" );
    } );

    it( "正确获取直线的位置", function () {
        var p1, p2;
        p1 = line.getPoint1();
        p2 = line.getPoint2();
        expect( p1.x ).toBe( 0 );
        expect( p1.y ).toBe( 0 );
        expect( p2.x ).toBe( 10 );
        expect( p2.x ).toBe( 10 );
    } );

    describe( "setPoint1()", function () {
        it( "设置第一个点", function () {
            expect( line.setPoint1( 20, 10 ).getPoint1() ).toMatchPlain( {
                x: 20,
                y: 10
            } );
        } );

        it( "保持链式调用", function () {
            // 上面的方法能保证
        } );
    } );

    describe( "setPoint2()", function () {
        it( "设置第一个点", function () {
            expect( line.setPoint2( 20, 10 ).getPoint2() ).toMatchPlain( {
                x: 20,
                y: 10
            } );
        } );

        it( "保持链式调用", function () {
            // 上面的方法能保证
        } );
    } );
} );