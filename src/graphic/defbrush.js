define(function (require, exports, module) {

    var svg = require('graphic/svg');
    var Brush = require('graphic/brush');

    return require('core/class').createClass('GradientBrush', {
        base: Brush,

        constructor: function (paper) {
            this.callBase();
            this.paper = paper;
        },

        getDef: function (paper) {
            throw new Error('abstract method called');
        },

        fill: function (path) {
            var node = path.node;
            var paper = this.paper;
            var gradient = this.getDef(paper);

            if (path.brushdef) {
                paper.removeDef(path.brushdef.id);
            }

            path.brushdef = gradient;
            node.setAttribute('fill', 'url(#' + gradient.id + ')');
            return this;
        }
    });
});