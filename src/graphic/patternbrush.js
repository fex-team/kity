define(function (require, exports, module) {
    var DefBrush = require('graphic/defbrush');
    var ShapeContainer = require('graphic/shapecontainer');
    var svg = require('graphic/svg');
    var Paper = require('graphic/paper');
    var clazz = require('core/class');

    var PatternBrush = clazz.createClass('PatternBrush', {
        base: DefBrush,
        mixins: [ShapeContainer],
        constructor: function () {
            this.callBase('pattern');
        },

        setMode: function (mode) {
            // 'repeat' or 'scale'
            this.mode = mode;
        },
        setWidth: function (width) {
            this.width = width;
            return this;
        },
        setHeight: function (height) {
            this.height = height;
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

            if (this.mode == 'scale') {
                node.setAttribute('patternUnits', 'objectBoundaryBox');
            } else {
                node.setAttribute('patternUnits', 'userSpaceOnUse');
            }
            node.setAttribute('width', this.getWidth());
            node.setAttribute('height', this.getHeight());
        }
    });

    clazz.extendClass(Paper, {
        createPatternBrush: function () {
            var brush = new PatternBrush();
            this.addResource(brush);
            return brush;
        }
    });
});