define(function (require, exports, module) {
    var Container = require('graphic/container');

    return require('core/class').createClass('ShapeContainer', {
        base: Container,

        /* protected */
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

        /* private */
        onAddShapes: function(shapes) {
            var parent = this.getShapeNode();
            for(var i = 0; i < shapes.length; i++) {
                parent.appendChild(shapes.node);
            }
        },

        /* private */
        onRemoveShapes: function(shapes) {
            var parent = this.getShapeNode();
            for(var i = 0; i < shapes.length; i++) {
                parent.removeChild(shapes.node);
            }
        },

        /* public */
        addShape: function (shape) {
            return this.appendItem(shape);
        },

        /* public */
        addShapes: function(shapes) {
            return this.addItems(shapes);
        },

        /* public */
        removeShape: function (pos) {
            return this.removeItem(pos);
        },

        /* public */
        getShapeById: function (id) {
            return this.getShapeNode().getElementById(id).shape;
        },

        /* protected */
        getShapeNode: function () {
            return this.shapeNode || this.node; // 最佳可能
        }
    });
});