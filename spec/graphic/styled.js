describe("Kity.Styled", function () {

    var Styled = require( "graphic/styled" );

    it("className测试", function() {

        var styled = new Styled();

        styled.addClass( "test" );

        expect( styled.hasClass( "test" ) ).toBe( true );
        expect( styled.hasClass( "test1" ) ).toBe( false );
        styled.removeClass( "test" );
        expect( styled.hasClass( "test" ) ).toBe( false );


    });

});