define(function(require, exports, module) {

    var svg = require('graphic/svg');
    var Brush = require('graphic/brush');
    
    return require('core/class').createClass( 'GradientBrush', {
        base: Brush,

        constructor: function() {
            this.callBase();
            this.stops = [];
        },

        addStop: function(offset, color) {
            this.stops.push({offset: offset, color: color});
            return this;
        },

        getGradientDef: function(paper) {
            throw new Error('abstract method called');
        },

        fill: function( path ) {
            var node = path.node;
            var paper = path.getPaper();
            var gradient = this.getGradientDef( paper );

            for(var i = 0, l = this.stops.length; i < l; i++) {
                var gstop = svg.createNode('stop');
                gstop.setAttribute('offset', this.stops[i].offset);
                gstop.setAttribute('stop-color', this.stops[i].color);
                gradient.appendChild(gstop);
            }

            if(path.brushdef) {
                paper.removeDef(path.brushdef.id);
            }

            path.brushdef = gradient;
            node.setAttribute('fill', 'url(#' + gradient.id + ')');
        }
    });
});