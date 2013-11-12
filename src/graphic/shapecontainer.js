define(function (require, exports, module) {
    var Container = require('graphic/container');
    return require('core/class').createClass('ShapeContainer', {
        base: Container,

        addItem: function (shape, pos) {
            if (pos === undefined || pos < 0 || pos >= this.getItems().length) {
                pos = this.getItems().length;
            }
            this.callBase(shape, pos);
            this.getShapeNode().insertBefore(shape.node, this.getShapeNode().childNodes[pos + 1]);
            return this;
        },

        removeItem: function (pos) {
            var shape = this.getItem(pos);
            if (shape) {
                this.getShapeNode().removeChild(shape.node);
            }
            this.callBase(pos);
            return this;
        },

        getShapeById: function (id) {
            return this.getShapeNode().getElementById(id).shape;
        },

        getShapeNode: function () {
            return this.shapeNode || this.node; // 最佳可能
        }
    });
});