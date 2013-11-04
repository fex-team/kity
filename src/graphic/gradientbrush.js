define(function(require, exports, module) {

    var className = "kity.graphic.GradientBrush";
    
    return require('core/class').createClass( className, {
        base: 'kity.graphic.Brush',

        constructor: function() {            
            this.callBase();
            this.stops = [];
        },

        addStop: function(offset, color) {
            this.stops.push({offset: offset, color: color});
        },

        getGradientDef: function(paper) {
            throw new Error('abstract method');
        },

        fill: function( path ) {
            var node = path.node;
            var paper = path.paper;
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