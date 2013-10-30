describe("Kity.Rect", function () {

    var Rect = require( 'graphic/rect' );

    it("初始化宽高构造Rect", function() {

        var rect = new Rect( 100, 50 );

        expect( rect.getWidth() ).toBe( 100 );
        expect( rect.getHeight() ).toBe( 50 );
        //默认初始位置为(0,0)
        expect( rect.getPosition().x ).toBe( 0 );
        expect( rect.getPosition().y ).toBe( 0 );

    });

    it("给定初始位置和宽高构造Rect", function() {

        var rect = new Rect( 100, 50, 10, 20 );

        expect( rect.getWidth() ).toBe( 100 );
        expect( rect.getHeight() ).toBe( 50 );
        expect( rect.getPosition().x ).toBe( 10 );
        expect( rect.getPosition().y ).toBe( 20 );

    });

    it("setWidth和setHeight接口测试", function() {

        var rect = new Rect( 100, 50, 10, 20 );

        rect.setWidth( 500 ).setHeight( 300 );

        expect( rect.getWidth() ).toBe( 500 );
        expect( rect.getHeight() ).toBe( 300 );

    });

    it("圆角接口测试", function() {

        var rect = new Rect( 100, 50, 10, 20 );

        rect.setRadius( 5 );

        expect( rect.getRadius() ).toBe( 5 );

    });

})