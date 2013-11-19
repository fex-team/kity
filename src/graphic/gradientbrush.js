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
            var gstop = svg.createNode('stop');
            gstop.setAttribute('offset', offset);
            gstop.setAttribute('stop-color', color);
            this.node.appendChild(gstop);
            return this;
        }
    });
});