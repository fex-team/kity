describe("Kity.ColorBrush", function() {

    var ColorBrush = require( "graphic/colorbrush" ),
        Color = requrie( "graphic/color" );

    it("无参构造的ColorBrush的初始颜色为Color的默认颜色", function() {

        var colorBrush = new ColorBrush();
        expect( colorBrush.getColor() instanceof Color ).toBe( true );
        expect( colorBrush.getColor().toRGBA() ).toBe( new Color().toRGBA() );

    });

    it("有参数构造ColorBrush", function() {

        var color = new Color( "#fff" ),
            colorBrush = new ColorBrush( color );

        expect( colorBrush.getColor().toRGBA ).toBe( color.toRGBA() );

    });

    it("setColor方法验证", function() {

        var color = new Color(),
            colorBrush = new ColorBrush();

        expect( colorBrush.getColor().toRGBA() ).toBe( color.toRGBA() );
        color = new Color( "#ff0000" );
        colorBrush.setColor( color );
        expect( colorBrush.getColor().toRGBA() ).not.toBe( new Color().toRGBA() );
        expect( colorBrush.getColor().toRGBA() ).toBe( color.toRGBA() );

    });

});