define(function(require, exports, module) {

    return require('core/class').createClass( 'Group', {

        base: require( 'graphic/shape' ),

        constructor: function() {

            this.callBase( 'g' );

        }

    });

});