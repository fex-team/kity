describe( "Kity.Styled", function () {
    var Rect = require( 'graphic/rect' );
    var Styled = require( "graphic/styled" );

    it( "className测试", function () {

        var styled = new Rect( 0, 0, 100, 100 );

        styled.addClass( "test" );

        expect( styled.hasClass( "test" ) ).toBe( true );
        expect( styled.hasClass( "test1" ) ).toBe( false );
        styled.removeClass( "test" );
        expect( styled.hasClass( "test" ) ).toBe( false );


    } );

} );