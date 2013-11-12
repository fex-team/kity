define(function (require, exports, module) {

    var svg = require('graphic/svg');
    var DefBrush = require('graphic/defbrush');

    return require('core/class').createClass('GradientBrush', {
        base: DefBrush,

        constructor: function (paper) {
            this.callBase(paper);
            this.stops = [];
        },

        addStop: function (offset, color) {
            this.stops.push({
                offset: offset,
                color: color
            });
            return this;
        },

        getDef: function (paper) {
            var def = this.getGradientDef(paper);
            for (var i = 0, l = this.stops.length; i < l; i++) {
                var gstop = svg.createNode('stop');
                gstop.setAttribute('offset', this.stops[i].offset);
                gstop.setAttribute('stop-color', this.stops[i].color);
                def.appendChild(gstop);
            }
            return def;
        },

        getGradientDef: function (paper) {
            throw new Error('abstract method call');
        }
    });
});