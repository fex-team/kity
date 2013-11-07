define(function(require, exports, module) {

    var Color = require( "graphic/color" );

    return require('core/class').createClass( 'Pen', {

        constructor: function( color, width ) {

            this.color = color || new Color();
            this.width = width || 1;
            this.linecap = null;
            this.linejoin = null;
            this.dashArray = null;
            this.opacity = this.color.get('a');

        },

        getColor: function () {
            return this.color;
        },

        setColor: function ( color ) {

            this.color = color;
            this.opacity = this.color.get( 'a' );

            return this;

        },

        getWidth: function () {

            return this.width;

        },

        setWidth: function ( width ) {

            this.width = width;

            return this;

        },

        getOpacity: function () {

            return this.opacity;

        },

        setOpacity: function ( opacity ) {

            this.opacity = opacity;

        },

        getLinecap: function () {

            return this.linecap;

        },

        setLinecap: function ( linecap ) {

            this.linecap = linecap;

        },

        getLinejoin: function () {

            return this.linejoin;

        },

        setLinejoin: function ( linejoin ) {

            this.linejoin = linejoin;

        },

        getDashArray: function () {

            return this.dashArray;

        },

        setDashArray: function ( dashArray ) {

            this.dashArray = dashArray;

            return this;

        }

    });

});