define(function (require, exports, module) {
    var DefBrush = require('graphic/defbrush');
    var ShapeContainer = require('graphic/shapecontainer');
    var svg = require('graphic/svg');

    return require('core/class').createClass('PatternBrush', {
        base: DefBrush,
        mixins: [ShapeContainer],
        constructor: function (builder) {
            this.callBase('pattern');
            if(typeof(builder) == 'function') {
                builder.call(this, this);
            }
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
});