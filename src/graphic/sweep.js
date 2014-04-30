define( function ( require, exports, module ) {
    var Point = require( 'graphic/point' );

    return require( 'core/class' ).createClass( 'Sweep', {

        base: require( 'graphic/path' ),

        constructor: function ( sectionArray, angle, angleOffset ) {
            this.callBase();
            this.sectionArray = sectionArray || [];
            this.angle = angle || 0;
            this.angleOffset = angleOffset || 0;
            this.draw();
        },

        getSectionArray: function () {
            return this.sectionArray;
        },

        setSectionArray: function ( value ) {
            this.sectionArray = value;
            return this.draw();
        },

        getAngle: function () {
            return this.angle;
        },

        setAngle: function ( value ) {
            this.angle = value;
            return this.draw();
        },

        getAngleOffset: function () {
            return this.angleOffset;
        },

        setAngleOffset: function ( value ) {
            this.angleOffset = value;
            return this.draw();
        },

        draw: function () {
            var sectionArray = this.sectionArray,
                i;
            for ( i = 0; i < sectionArray.length; i += 2 ) {
                this.drawSection( sectionArray[ i ], sectionArray[ i + 1 ] );
            }
            return this;
        },

        drawSection: function ( from, to ) {
            var angleLength = this.angle && ( this.angle % 360 ? this.angle % 360 : 360 ),
                angleStart = this.angleOffset,
                angleHalf = angleStart + angleLength / 2,
                angleEnd = angleStart + angleLength,
                drawer = this.getDrawer();

            drawer.moveTo( Point.fromPolar( from, angleStart ) );

            drawer.lineTo( Point.fromPolar( to, angleStart ) );

            if ( to ) {
                drawer.carcTo( to, 0, 1, Point.fromPolar( to, angleHalf ) );
                drawer.carcTo( to, 0, 1, Point.fromPolar( to, angleEnd ) );
            }

            drawer.lineTo( Point.fromPolar( from, angleEnd ) );

            if ( from ) {
                drawer.carcTo( from, 0, 1, Point.fromPolar( from, angleHalf ) );
                drawer.carcTo( from, 0, 1, Point.fromPolar( from, angleStart ) );
            }

            drawer.close();
        }
    } );
} );