describe("Kity.RadialGradientBrush", function() {

    var RadialGradientBrush = require( "graphic/radialgradientbrush" );

    it("构造验证", function() {

        var radialBrush = new RadialGradientBrush();

        describe("Kity.RadialGradientBrush:getCenter", function() {

            it( "默认中心位置验证", function () {

                var center = radialBrush.getCenter();

                expect( center.x ).toBe( 0.5 );
                expect( center.y ).toBe( 0.5 );


            } );

            it( "默认焦点位置验证", function () {

                var focal = radialBrush.getFocal();

                expect( focal.x ).toBe( 0.5 );
                expect( focal.y ).toBe( 0.5 );


            } );

            it( "默认半径验证", function () {

                var radius = radialBrush.getRadius();

                expect( radius ).toBe( 0.5 );


            } );

        });

    });

    it("设置中心位置验证", function() {

        var radialBrush = new RadialGradientBrush();

        radialBrush.setCenter( 0.2, 0.3 );

        expect( radialBrush.getCenter().x ).toBe( 0.2 );
        expect( radialBrush.getCenter().y ).toBe( 0.3 );

    });

    it("设置焦点位置验证", function() {

        var radialBrush = new RadialGradientBrush();

        radialBrush.setFocal( 0.2, 0.3 );

        expect( radialBrush.getFocal().x ).toBe( 0.2 );
        expect( radialBrush.getFocal().y ).toBe( 0.3 );

    });

    it("设置半径验证", function() {

        var radialBrush = new RadialGradientBrush();

        radialBrush.setRadius( 0.7 );

        expect( radialBrush.getRadius() ).toBe( 0.7 );

    });

});