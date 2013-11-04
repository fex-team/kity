define(function(require, exports, module) {

    var Color = require('graphic/color');
    var Brush = require('graphic/brush');
    
    return require('core/class').createClass( 'ColorBrush', {
        base: Brush,

        constructor: function( color ) {
            this.callBase();
            color = color || new Color();
            this.setColor(new Color());
        },

        getType: function() {
            return 'ColorBrush';
        },

        setColor: function( color ) {
            this.color = color;
        },

        getColor: function() {
            return this.color;
        },

        fill: function( path ) {
            var node = path.node;
            node.setAttribute('fill', this.getColor());
        }
    });
});