define(function(require, exports, module) {

    return require('core/class').createClass( 'Image', {

        base: require( 'graphic/shape' ),

        constructor: function () {

            this.callBase( 'image' );
            this.url = null;
            
        },

        setUrl: function ( url ) {

            this.url = url === "" ? null : url;
            this.node.setAttribute( "xlink:href", this.url );

            return this;

        },

        getUrl: function () {

            return this.url;

        }

    });

});