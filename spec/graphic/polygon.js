describe("Kity.Polygon", function () {

    var Polygon = kity.Polygon,
        Point = kity.ShapePoint;
    it("无参构造Polygon", function() {

        var polygon = new Polygon();

        expect( polygon.getPathData() ).toBe( "M 0 0" );
        expect( polygon.getPoints().length ).toBe( 0 );
        expect( polygon.isClosed() ).toBe( false );
    });

    it("点集合构造Polygon", function() {

        var polygon = new Polygon( [ new Point(3, 2), new Point(4, 2) ] );

        expect( polygon.getPathData() ).not.toBe( "" );
        expect( polygon.getPoints().length ).toBe( 2 );

    });

    it("child操作验证", function() {

        var polygon = new Polygon();

        polygon.addPoint( new Point(3, 2) );
        expect( polygon.getPathData() ).not.toBe( "" );
        expect( polygon.getPoints().length ).toBe( 1 );
        polygon.removePoint( 0 );
        expect( polygon.getPathData() ).toBe( "M 0 0" );
        expect( polygon.getPoints().length ).toBe( 0 );

    });

});