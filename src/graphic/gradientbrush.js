define(function (require, exports, module) {

    var svg = require('graphic/svg');
    var DefBrush = require('graphic/defbrush');

    return require('core/class').createClass('GradientBrush', {
        base: DefBrush,

        constructor: function (gradientNodeType) {
            this.callBase(gradientNodeType);
            this.stops = [];
        },

        addStop: function (offset, color) {
            this.stops.push({
                offset: offset,
                color: color
            });
            return this;
        },

        /* implement abstract */
        renderNode: function () {
            for (var i = 0, l = this.stops.length; i < l; i++) {
                var gstop = svg.createNode('stop');
                gstop.setAttribute('offset', this.stops[i].offset);
                gstop.setAttribute('stop-color', this.stops[i].color);
                this.node.appendChild(gstop);
            }
        }
    });
});