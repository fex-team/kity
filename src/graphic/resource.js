define(function(require, exports, module) {
    var svg = require('graphic/svg');
    return require('core/class').createClass('Resource', {
        constructor: function(nodeType, paper) {
            this.callBase();
            this.node = svg.createNode(nodeType);
            if (paper) {
                paper.addResource(this);
            }
        },
        toString: function() {
            return 'url(#' + this.node.id + ')';
        }
    });
});