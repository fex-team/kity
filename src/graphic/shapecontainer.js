define(function (require, exports, module) {
    var Container = require('graphic/container');

    return require('core/class').createClass('ShapeContainer', {
        base: Container,

        onItemChanged: function(type, shapes) {
            switch(type) {
                case 'add':
                    this.onAddShapes( shapes );
                    break;
                case 'remove':
                    this.onRemoveShapes( shapes );
                    break;
            }
        },

        onAddShapes: function(shapes) {
            var parent = this.getShapeNode();
            for(var i = 0; i < shapes.length; i++) {
                parent.appendChild(shapes.node);
            }
        },

        onRemoveShapes: function(shapes) {
            var parent = this.getShapeNode();
            for(var i = 0; i < shapes.length; i++) {
                parent.removeChild(shapes.node);
            }
        },

        addShape: function (shape) {
            return this.appendItem(shape);
        },

        addShapes: function(shapes) {
            return this.addItems(shapes);
        },

        removeShape: function (pos) {
            return this.removeItem(pos);
        },

        getShape: function(pos) {
            return this.getItem(pos);
        },

        getShapeById: function (id) {
            return this.getShapeNode().getElementById(id).shape;
        },

        getShapeNode: function () {
            return this.shapeNode || this.node; // 最佳可能
        }
    });
});