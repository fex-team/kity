define(function (require, exports, module) {
    var DefBrush = require('graphic/defbrush');
    var ShapeContainer = require('graphic/shapecontainer');
    var svg = require('graphic/svg');

    return require('core/class').createClass('PatternBrush', {
        base: DefBrush,
        mixins: [ShapeContainer],
        constructor: function () {
            this.callBase('pattern');
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
        setWidth: function (width) {
            this.width = width;
            this.node.setAttribute('width', width);
            return this;
        },
        setHeight: function (height) {
            this.height = height;
            this.node.setAttribute('height', height);
            return this;
        },
        getWidth: function () {
            return this.width;
        },
        getHeight: function () {
            return this.height;
        },
        renderNode: function () {
            var node = this.node;
            node.setAttribute('patternUnits', 'userSpaceOnUse');
        }
    });
});