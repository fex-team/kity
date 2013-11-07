define(function(require, exports, module) {

    return require('core/class').createClass( 'Line', {

        base: require( 'graphic/path' ),

        constructor: function( x1, y1, x2, y2 ) {

            this.callBase();

            this.x1 = x1;
            this.x2 = x2;
            this.y1 = y1;
            this.y2 = y2;

            this.update();

        },

        setPoint1: function ( x, y ) {
            this.x1 = x;
            this.y1 = y;
            return this;
        },

        setPoint2: function ( x, y ) {
            this.x2 = x;
            this.y2 = y;
            return this;
        },

        getPoint1: function () {
            return {
                x: this.x1,
                y: this.y1
            };
        },

        getPoint2: function () {
            return {
                x: this.x2,
                y: this.y2
            };
        },

        update: function () {

            var pathData = [
                'M ' + this.x1 + ' ' + this.y1,
                ' L ' + this.x2 + ' ' + this.y2
            ];

            this.setPathData( pathData.join( "" ) );

        }

    });
});