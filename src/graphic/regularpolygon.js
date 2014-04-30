define( function ( require, exports, module ) {

    var Point = require( 'graphic/point' );

    return require( 'core/class' ).createClass( "RegularPolygon", {
        base: require( 'graphic/path' ),
        constructor: function ( side, radius ) {
            this.callBase();
            this.radius = radius || 0;
            this.side = Math.max( side || 3, 3 );
            this.draw();
        },
        getSide: function () {
            return this.side;
        },
        setSide: function ( side ) {
            this.side = side;
            return this.draw();
        },
        getRadius: function () {
            return this.radius;
        },
        setRadius: function ( radius ) {
            this.radius = radius;
            return this.draw();
        },
        draw: function () {
            var radius = this.radius,
                side = this.side,
                step = Math.PI * 2 / side,
                drawer = this.getDrawer(),
                i;
            drawer.clear();
            drawer.moveTo( Point.fromPolar( radius, Math.PI / 2 ) );
            for ( i = 0; i <= side; i++ ) {
                drawer.lineTo( Point.fromPolar( radius, step * i + Math.PI / 2 ) );
            }
            return this;
        }
    } );
} );