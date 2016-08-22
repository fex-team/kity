/* global kity: true */
var Coordinate = require('../../src/core/class').createClass( "Coordinate", {
    base: kity.Group,

    constructor: function ( baseColor, gridX, gridY, gridSize ) {
        this.callBase();
        baseColor = kity.Color.parse( baseColor || 'black' );
        gridX = gridX || [ -10, 10 ];
        gridY = gridY || [ -10, 10 ];
        gridSize = gridSize || 10;

        var x0 = gridX[ 0 ] * gridSize;
        var x1 = gridX[ 1 ] * gridSize;
        var y0 = gridY[ 0 ] * gridSize;
        var y1 = gridY[ 1 ] * gridSize;

        var alisX, alisY, grid, marker;

        marker = new kity.Marker().pipe( function () {
            this.setWidth( 6 ).setHeight( 6 );
            this.setRef( 3, 0 );
            this.setViewBox( 0, -5, 10, 10 );
            this.addShape( new kity.Path().pipe( function () {
                var d = this.getDrawer();
                d.moveTo( 0, -5 );
                d.lineTo( 10, 0 );
                d.lineTo( 0, 5 );
                d.lineTo( 0, -5);
                d.close();
                this.fill( baseColor );
            } ) );
        } );

        alisX = new kity.Path().pipe( function () {
            var d = this.getDrawer();
            d.moveTo(x0, 0 );
            d.lineTo(x1, 0 );
            this.stroke( baseColor );
            this.whenPaperReady( function ( paper ) {
                paper.addResource( marker );
                this.setMarker( marker, 'end' );
            } );
        } );

        alisY = new kity.Path().pipe( function () {
            var d = this.getDrawer();
            d.moveTo( 0, y0);
            d.lineTo( 0, y1);
            this.stroke( baseColor );
            this.whenPaperReady( function ( paper ) {
                paper.addResource( marker );
                this.setMarker( marker, 'end' );
            } );
        } );

        var me = this;

        grid = new kity.Path().pipe( function () {
            var ix, iy, d;
            d = this.getDrawer();
            for ( ix = gridX[ 0 ]; ix <= gridX[ 1 ]; ix++ ) {
                d.moveTo( ix * gridSize, y0);
                d.lineTo( ix * gridSize, y1);
            }
            for ( iy = gridY[ 0 ]; iy <= gridY[ 1 ]; iy++ ) {
                d.moveTo(x0, iy * gridSize );
                d.lineTo(x1, iy * gridSize );
            }
            this.stroke( baseColor );
            this.setOpacity( 0.1 );


            this.on('mousemove', function (e) {
                var offsetX = e.originEvent.offsetX;
                var offsetY = e.originEvent.offsetY;


                if (offsetY % 10 === 0) {
                    refX.setPathData('M' + x0 + ',' + offsetY + 'L' + x1 + ',' + offsetY);
                }
                else {
                    refX.setPathData('M' + x0 + '-1,' + 'L' + x1 + ',-1');
                }

                if (offsetX % 10 === 0) {
                    refY.setPathData('M' + offsetX + ',' + y0 + 'L' + offsetX + ',' + y1);
                }
                else {
                    refY.setPathData('M-1'+ ',' + y0 + 'L-1' + ',' + y1);
                }
            });
        } );

        var refX = new kity.Path().pipe(function () {
            var d = this.getDrawer();
            d.moveTo(x0, -1);
            d.lineTo(x1, -1);
            this.stroke('green') ;
            this.setOpacity(0.2);
        });

        var refY = new kity.Path().pipe(function () {
            var d = this.getDrawer();
            d.moveTo(-1, y0);
            d.lineTo(-1, y1);
            this.stroke('green') ;
            this.setOpacity(0.2);
        });


        this.addShapes( [ grid, alisX, alisY, refX, refY ] );
    }
} );