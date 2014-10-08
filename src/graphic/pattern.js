define(function(require, exports, module) {

    var Resource = require('graphic/resource');
    var ShapeContainer = require('graphic/shapecontainer');
    var svg = require('graphic/svg');

    return require('core/class').createClass('Pattern', {

        base: Resource,

        mixins: [ShapeContainer],

        constructor: function(paper) {
            this.callBase('pattern', paper);
            this.node.setAttribute('patternUnits', 'userSpaceOnUse');
        },
        setX: function(x) {
            this.x = x;
            this.node.setAttribute('x', x);
            return this;
        },
        setY: function(y) {
            this.y = y;
            this.node.setAttribute('y', y);
            return this;
        },
        setWidth: function(width) {
            this.width = width;
            this.node.setAttribute('width', width);
            return this;
        },
        setHeight: function(height) {
            this.height = height;
            this.node.setAttribute('height', height);
            return this;
        },
        getWidth: function() {
            return this.width;
        },
        getHeight: function() {
            return this.height;
        }
    });
});