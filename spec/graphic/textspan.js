getRequires(["graphic/textspan"]);
describe("Kity.TextSpan", function () {

    var TextSpan ;
    beforeEach(function() {
        if(TextSpan==undefined)TextSpan = src[0];
    });
    it("构造测试", function() {

        var textspan = new TextSpan( "test" );

        expect( textspan.getContent() ).toBe( "test" );

    });

    it("content操作", function() {

        var textspan = new TextSpan( "test" );

        textspan.setContent( "hello world!" );
        expect( textspan.getContent() ).toBe( "hello world!" );

    });

});