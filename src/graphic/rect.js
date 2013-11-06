define(function(require, exports, module) {

    return require('core/class').createClass( 'Rect', {

        base: require( 'graphic/path' ),

        constructor: function( x, y, width, height ) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.radius = 0;

        },

        setWidth: function ( width ) {
            this.width = width;

            return this;
        },

        setHeight: function ( height ) {
            this.height = height;

            return this;
        },

        setSize: function ( width, height ) {
            this.width = width;
            this.height = height;

            return this;
        },

        getRadius: function () {
            return this.radius;
        },

        setRadius: function ( radius ) {
            this.radius = radius;
        },

        getPosition: function () {
            return {
                width: this.width,
                height: this.height
            };
        },

        setPosition: function ( position ) {
            this.x = position.x;
            this.y = position.y;

            return this;
        },

        getPositionX: function () {
            return this.x;
        },

        getPositionY: function () {
            return this.y;
        },

        setPositionX: function ( x ) {
            this.x = x;
            return this;
        },

        setPositionY: function ( y ) {
            this.y = y;
            return this;
        }

    });
});