describe("Kity.Polyline", function () {
    var Polyline = kity.Polyline, Point = kity.Point;


    it("无参构造Polyline", function() {

        var polyline = new Polyline();

        expect( polyline.getPathData() ).toBe( "M 0 0" );
        expect( polyline.getPoints().length ).toBe( 0 );
        expect( polyline.isClosed() ).toBe( false );

    });

    it("点集合构造Polyline", function() {

        var polyline = new Polyline( [ new Point(3, 2), new Point(4, 2) ] );

        expect( polyline.getPathData() ).not.toBe( "" );
        expect( polyline.getPoints().length ).toBe( 2 );
        expect( polyline.isClosed() ).toBe( false );

    });

    it("Points操作验证", function() {

        var polyline = new Polyline();

        polyline.addPoint( new Point(3, 2) );
        expect( polyline.getPathData() ).not.toBe( "" );
        expect( polyline.getPoints().length ).toBe( 1 );
        polyline.removePoint( 0 );
        expect( polyline.getPathData() ).toBe( "M 0 0" );
        expect( polyline.getPoints().length ).toBe( 0 );

        expect( polyline.isClosed() ).toBe( false );
    });

});