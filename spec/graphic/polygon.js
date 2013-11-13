describe("Kity.Polygon", function () {

    var Polygon = require( 'graphic/polygon' );

    it("无参构造Polygon", function() {

        var polygon = new Polygon();

        expect( polygon.getPathData() ).toBe( "" );
        expect( polygon.getItems().length ).toBe( 0 );
        expect( polygon.isClosed() ).toBe( false );
    });

    it("点集合构造Polygon", function() {

        var polygon = new Polygon( [ {
            x: 3,
            y: 2
        }, {
            x: 4,
            y: 2
        } ] );

        expect( polygon.getPathData() ).not.toBe( "" );
        expect( polygon.getItems().length ).toBe( 2 );
        expect( polygon.isClosed() ).toBe( true );

    });

    it("child操作验证", function() {

        var polygon = new Polygon();

        polygon.addItem( { x: 3, y: 2 } );
        expect( polygon.getPathData() ).not.toBe( "" );
        expect( polygon.getItems().length ).toBe( 1 );
        polygon.removeItem( 0 );
        expect( polygon.getPathData() ).toBe( "" );
        expect( polygon.getItems().length ).toBe( 0 );

    });

});