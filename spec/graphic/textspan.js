describe("Kity.TextSpan", function () {

    var TextSpan = kity.TextSpan;
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