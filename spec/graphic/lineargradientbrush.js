describe("Kity.LinearGradientBrush", function() {

    var LinearGradientBrush = kity.LinearGradientBrush;
    it("构造验证", function() {

        var linearBrush = new LinearGradientBrush(),
            startPosition = linearBrush.getStartPosition(),
            endPosition = linearBrush.getEndPosition();

        expect( startPosition.x ).toBe( 0 );
        expect( startPosition.y ).toBe( 0 );
        expect( endPosition.x ).toBe( 1 );
        expect( endPosition.y ).toBe( 0 );

    });

    it("设置起始点", function() {

        var linearBrush = new LinearGradientBrush(),
            startPosition = null,
            endPosition = null;

        linearBrush.setStartPosition( 0, 0.2 );
        linearBrush.setEndPosition( 0, 0.8 );

        startPosition = linearBrush.getStartPosition();
        endPosition = linearBrush.getEndPosition();

        expect( startPosition.x ).toBe( 0 );
        expect( startPosition.y ).toBe( 0.2 );
        expect( endPosition.x ).toBe( 0 );
        expect( endPosition.y ).toBe( 0.8 );

    });

});