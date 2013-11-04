define(function(require, exports, module) {
    var svg = require('graphic/svg');
    var Paper = require('graphic/paper');
    return require('core/class').createClass( 'Shape', {
        constructor: function( tagName ) {
            this.node = svg.createNode( tagName );
        },
        getPaper: function() {
            var parent = this.parent;
            while(parent && !(parent instanceof Paper)) {
                parent = parent.parent;
            }
            return parent;
        }
    });
});