getRequires(['graphic/rect',"graphic/styled" ]);
describe( "Kity.Styled", function () {
    var Rect , Styled ;
    beforeEach(function() {
        if(Rect==undefined){
            Rect = src[0];
            Styled = src[1];
        }
    });
    it( "className测试", function () {

        var styled = new Rect( 0, 0, 100, 100 );

        styled.addClass( "test" );

        expect( styled.hasClass( "test" ) ).toBe( true );
        expect( styled.hasClass( "test1" ) ).toBe( false );
        styled.removeClass( "test" );
        expect( styled.hasClass( "test" ) ).toBe( false );


    } );

} );