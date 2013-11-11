describe("Kity.ImageBrush", function() {

    var ColorBrush = require( "graphic/imagebrush" );

    it("构造验证", function() {

        var url = 'http://su.bdimg.com/static/superpage/img/logo_white_2a2fcb5a.png',
            imageBrush = new ImageBrush( url );

        expect( imageBrush.getUrl() ).toBe( url );

    });

    it("setUrl验证", function() {

        var url = 'http://su.bdimg.com/static/superpage/img/logo_white_2a2fcb5a.png',
            imageBrush = new ImageBrush( url );

        expect( imageBrush.getUrl() ).toBe( url );

        imageBrush.setUrl( 'http:///www.google.com' );

        expect( imageBrush.getUrl()).not.toBe( url );

    });

});