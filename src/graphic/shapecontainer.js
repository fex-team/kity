define(function(require, exports, module) {
    var Container = require('graphic/container');
    var utils = require('core/utils');

    var ShapeContainer = require('core/class').createClass('ShapeContainer', {
        base: Container,

        isShapeContainer:true,
        /* private */
        handleAdd: function(shape, index) {
            var parent = this.getShapeNode();
            parent.insertBefore(shape.node, parent.childNodes[index] || null);
            shape.trigger('add', {
                container: this
            });
            if (shape.notifyTreeModification) {
                shape.notifyTreeModification('treeadd', this);
            }
        },

        /* private */
        handleRemove: function(shape, index) {
            var parent = this.getShapeNode();
            parent.removeChild(shape.node);
            shape.trigger('remove', {
                container: this
            });
            if (shape.notifyTreeModification) {
                shape.notifyTreeModification('treeremove', this);
            }
        },

        /* private */
        notifyTreeModification: function(type, container) {
            this.eachItem(function(index, shape) {
                if (shape instanceof ShapeContainer) {
                    shape.notifyTreeModification(type, container);
                }
                shape.trigger(type, {
                    container: container
                });
            });
        },

        /* public */
        getShape: function(index) {
            return this.getItem(index);
        },

        /* public */
        addShape: function(shape, index) {
            return this.addItem(shape, index);
        },

        appendShape: function(shape) {
            return this.addShape(shape);
        },

        prependShape: function(shape) {
            return this.addShape(shape, 0);
        },

        replaceShape: function(replacer, origin) {
            var index = this.indexOf(origin);
            if (index === -1) {
                return;
            }
            this.removeShape(index);
            this.addShape(replacer, index);
            return this;
        },

        addShapeBefore: function(shape, refer) {
            var index = this.indexOf(refer);
            return this.addShape(shape, index);
        },

        addShapeAfter: function(shape, refer) {
            var index = this.indexOf(refer);
            return this.addShape(shape, index === -1 ? undefined : index + 1);
        },

        /* public */
        addShapes: function(shapes) {
            return this.addItems(shapes);
        },

        /* public */
        removeShape: function(index) {
            return this.removeItem(index);
        },

        getShapes: function() {
            return this.getItems();
        },

        getShapesByType:function(name){
            var shapes = [];
            function getShapes(shape){
                utils.each(shape.getShapes(),function(n){
                    if(n.isShapeContainer){
                        getShapes(n)
                    }else{
                        if(name.toLowerCase() == n.getType().toLowerCase()){
                            shapes.push(n)
                        }
                    }

                });
            }
            getShapes(this);
            return shapes;
        },

        /* public */
        getShapeById: function(id) {
            return this.getShapeNode().getElementById(id).shape;
        },

        bringTo: function(shape, index) {
            return this.removeShape(shape).addShape(shape, index);
        },

        bringFront: function(shape) {
            return this.bringTo(shape, this.indexOf(shape) + 1);
        },

        bringBack: function(shape) {
            return this.bringTo(shape, this.indexOf(shape) - 1);
        },

        bringTop: function(shape) {
            return this.removeShape(shape).addShape(shape);
        },

        bringRear: function(shape) {
            return this.removeShape(shape).addShape(shape, 0);
        },

        /* protected */
        getShapeNode: function() {
            return this.shapeNode || this.node; // 最佳可能
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        bringTo: function(index) {
            this.container.bringTo(this, index);
            return this;
        },
        bringFront: function() {
            this.container.bringFront(this);
            return this;
        },
        bringBack: function() {
            this.container.bringBack(this);
            return this;
        },
        bringTop: function() {
            this.container.bringTop(this);
            return this;
        },
        bringRear: function() {
            this.container.bringRear(this);
            return this;
        }
    });

    return ShapeContainer;

});