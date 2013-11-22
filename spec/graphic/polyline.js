getRequires(['graphic/polyline']);
describe("Kity.Polyline", function () {
    var Polyline ;
    beforeEach(function() {
        if(Polyline==undefined)Polyline = src[0];
    });

    it("无参构造Polyline", function() {

        var polyline = new Polyline();

        expect( polyline.getPathData() ).toBe( "" );
        expect( polyline.getChildren().length ).toBe( 0 );
        expect( polyline.isClosed() ).toBe( false );

    });

    it("点集合构造Polyline", function() {

        var polyline = new Polyline( [ {
            x: 3,
            y: 2
        }, {
            x: 4,
            y: 2
        } ] );

        expect( polyline.getPathData() ).not.toBe( "" );
        expect( polyline.getChildren().length ).toBe( 2 );
        expect( polyline.isClosed() ).toBe( false );

    });

    it("child操作验证", function() {

        var polyline = new Polyline();

        polyline.addChild( { x: 3, y: 2 } );
        expect( polyline.getPathData() ).not.toBe( "" );
        expect( polyline.getChildren().length ).toBe( 1 );
        polyline.removeChild( 0 );
        expect( polyline.getPathData() ).toBe( "" );
        expect( polyline.getChildren().length ).toBe( 0 );

        expect( polyline.isClosed() ).toBe( false );
    });

});