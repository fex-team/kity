define(function (require, exports, module) {
    var DefBrush = require('graphic/defbrush');
    var Parent = require('graphic/parent');
    var svg = require('graphic/svg');
    var Paper = require('graphic/paper');
    var clazz = require('core/class');

    var PatternBrush = clazz.createClass('PatternBrush', {
        base: DefBrush,
        mixins: [Parent],
        constructor: function () {
            this.callBase('pattern');
        },
        addChild: function (shape, pos) {
            if (pos === undefined || pos < 0 || pos >= this.getChildren().length) {
                pos = this.getChildren().length;
            }
            this.callMixin(shape, pos);
            if (this.node) {
                this.node.insertBefore(shape.node, this.node.childNodes[pos]);
            }
            return this;
        },
        removeChild: function (pos) {
            var shape = this.getChild(pos);
            if (shape && this.node) {
                this.node.removeChild(shape.node);
            }
            return this.callMixin(pos);
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
            this.forEachChild(function (index, shape) {
                node.insertBefore(shape.node, null);
            });

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
            return new PatternBrush(this);
        }
    });
});