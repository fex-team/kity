define(function(require, exports, module) {
    var Shape = require('graphic/shape');
    return require('core/class').createClass('TextContent', {

        base: Shape,

        constructor: function(nodeType) {
            // call shape constructor
            this.callBase(nodeType);
            this.shapeNode = this.shapeNode || this.node;
        },

        clearContent: function() {
            while (this.shapeNode.firstChild) {
                this.shapeNode.removeChild(this.shapeNode.firstChild);
            }
            return this;
        },

        setContent: function(content) {
            this.shapeNode.textContent = content;
            return this;
        },

        getContent: function() {
            return this.shapeNode.textContent;
        },

        appendContent: function(content) {
            this.shapeNode.textContent += content;
            return this;
        },

        setSize: function(value) {
            this.fontsize = value;
            this.node.setAttribute('font-size', value);
            return this;
        },

        getSize: function() {
            return this.fontsize;
        },

        getExtentOfChar: function(index) {
            return this.node.getExtentOfChar(index);
        },

        getRotationOfChar: function(index) {
            return this.node.getRotationOfChar(index);
        },

        getCharNumAtPosition: function(x, y) {
            return this.node.getCharNumAtPosition(this.node.viewportElement.createSVGPoint(x, y));
        }
    });
});