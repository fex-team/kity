getRequires([ 'graphic/polygon']);
describe("Kity.Polygon", function () {
    var Polygon = require( 'graphic/polygon' ),
        Point = require( 'graphic/shapepoint' );
    var Polygon ;
    beforeEach(function() {
        if(Polygon==undefined) Polygon = src[0];
    });
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