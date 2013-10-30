describe("Kity.Polyline", function () {

    var Polyline = require( 'graphic/polyline' );

    it("无参构造Polyline", function() {

        var polyline = new Polyline();

        expect( polyline.getPathData() ).toBe( "" );
        expect( polyline.getChildren().length ).toBe( 0 );

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

    });

    it("child操作验证", function() {

        var polyline = new Polyline();

        polyline.addChild( { x: 3, y: 2 } );
        expect( polyline.getPathData() ).not.toBe( "" );
        expect( polyline.getChildren().length ).toBe( 1 );
        polyline.removeChild( 0 );
        expect( polyline.getPathData() ).toBe( "" );
        expect( polyline.getChildren().length ).toBe( 0 );

    });

});