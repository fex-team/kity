define(function(require, exports, module) {
    var createClass = require('core/class').createClass;
    var utils = require('core/utils');
    var svg = require('graphic/svg');
    var Parent = require('graphic/parent');
    var EventHandler = require('graphic/eventhandler');
    var id = 0;
    return createClass('Paper', {

        mixins: [Parent, EventHandler],

        constructor: function(container) {
            this.callBase();
            if (utils.isString(container)) {
                container = document.getElementById(container);
            }
            this.node = svg.createNode('svg');
            this.node.paper = this;
            this.container = container;
            container.appendChild(this.node);

            this.defs = svg.createNode('defs');
            this.node.appendChild(this.defs);
        },

        getNode: function() {
            return this.node;
        },

        getContainer: function() {
            return this.container;
        },

        getWidth: function() {
            return +this.node.getAttribute('width');
        },

        setWidth: function(width) {
            this.node.setAttribute('width', width);
            return this;
        },

        getHeight: function() {
            return +this.node.getAttribute('height');
        },

        setHeight: function(height) {
            this.node.setAttribute('height', height);
            return this;
        },

        getViewBox: function() {
            var attr = this.node.getAttribute('viewBox');
            if (attr === null) {
                return {
                    x: 0,
                    y: 0,
                    width: this.getWidth(),
                    height: this.getHeigth()
                };
            } else {
                attr = attr.split(' ');
                return {
                    x: +attr[0],
                    y: +attr[1],
                    width: +attr[2],
                    height: +attr[3]
                };
            }
        },

        setViewBox: function(x, y, width, height) {
            this.node.setAttribute('viewBox', [x, y, width, height].join(' '));
            return this;
        },

        addChild: function(shape, pos) {
            if (pos === undefined || pos < 0 || pos >= this.getChildren().length) {
                pos = this.getChildren().length;
            }
            this.callMixin(shape, pos);
            this.node.insertBefore(shape.node, this.node.childNodes[pos + 1]);
        },

        getShapeById: function(id) {
            return this.node.getElementById(id).shape;
        },

        removeChild: function(pos) {
            var shape = this.getChild(pos);
            if (shape) {
                this.node.removeChild(shape.node);
            }
            this.callMixin(pos);
        },

        createDef: function(tagName) {
            var def = svg.createNode(tagName);
            this.defs.appendChild(def);
            def.id = tagName + '_def_' + id++;
            return def;
        },

        removeDef: function(id) {
            this.def.removeChild(this.def.getElementById(id));
        }
    });
});