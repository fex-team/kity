define(function (require, exports, module) {

    var svg = require('graphic/svg');
    var Brush = require('graphic/brush');

    return require('core/class').createClass('GradientBrush', {
        base: Brush,

        constructor: function (nodeType) {
            this.callBase();
            this.node = svg.createNode(nodeType);
        },

        fill: function (path) {
            var pathNode = path.node;
            pathNode.setAttribute('fill', 'url(#' + this.node.id + ')');
            return this;
        }
    });
});