describe("Shape", function () {

    it("初始化宽高构造Rect", function() {

        var rect = new Rect( 100, 50 );

        expect( rect.getWidth() ).toBe( 100 );
        expect( rect.getHeight() ).toBe( 50 );
        //默认初始位置为(0,0)
        expect( rect.getPosition().x ).toBe( 0 );
        expect( rect.getPosition().y ).toBe( 0 );

    });


})