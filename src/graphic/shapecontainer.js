define(function (require, exports, module) {
    var Container = require('graphic/container');

    return require('core/class').createClass('ShapeContainer', {
        base: Container,

        /* protected override */
        onContainerChanged: function(type, shapes) {
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
                parent.appendChild(shapes[i].node);
            }
        },

        /* private */
        onRemoveShapes: function(shapes) {
            var parent = this.getShapeNode();
            for(var i = 0; i < shapes.length; i++) {
                parent.removeChild(shapes[i].node);
            }
        },

        /* public */
        addShape: function (shape) {
            return this.addItem(shape);
        },

        /* public */
        addShapes: function(shapes) {
            return this.addItems(shapes);
        },

        /* public */
        removeShape: function (pos) {
            return this.removeItem(pos);
        },

        getShapes: function() {
            return this.getItems();
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