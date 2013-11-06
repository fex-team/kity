define(function(require, exports, module) {

    return require('core/class').createClass( 'Polygon', {

        constructor: function () {

            this.points = [].slice.call( arguments, 0 );

        }

    });
});