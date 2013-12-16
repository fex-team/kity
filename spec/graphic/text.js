describe("Kity.Text", function () {
    var Text = kity.Text;
    it("无参数构造", function() {

        var text = new Text();

        expect( text.getContent() ).toBe( "" );

    });

    it("带参数构造", function() {

        var text = new Text( "test" );

        expect( text.getContent() ).toBe( "test" );

    });

    it("content操作", function() {

        var text = new Text( "test" );

        text.setContent( "hello world!" );
        expect( text.getContent() ).toBe( "hello world!" );

        text.appendContent( " nihao" );
        expect( text.getContent() ).toBe( "hello world! nihao" );

    });

});