define(function (require, exports, module) {

    var svg = require('graphic/svg');

    return require('core/class').createClass('GradientBrush', {

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