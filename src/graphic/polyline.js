define(function(require, exports, module) {

    return require('core/class').createClass( 'Polyline', {

        base: require( 'polyline' ),

        constructor: function () {
            this.points = [].slice.call( arguments, 0 );
        }

    });
});