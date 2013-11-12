define(function (require, exports, module) {
    var Shape = require('graphic/shape');
    var Container = require('graphic/container');
    return require('core/class').createClass('Text', {
        base: Shape,
        mixins: [Container],
        constructor: function (content) {
            this.callBase('text');
            if (content !== undefined) {
                this.setContent(content);
            }
        },
        clear: function () {
            this.content = '';
            while (this.node.firstChild) {
                this.node.removeChild(this.node.firstChild);
            }
        },
        setContent: function (content) {
            this.clear();
            this.appendContent(content);
        },
        appendContent: function (content) {
            this.content += content;
            this.node.appendChild(document.createTextNode(content));
        },
        addItem: function (tspan, pos) {
            this.callMixin(tspan, pos);
            this.node.appendChild(tspan.node);
        },
        removeItem: function (pos) {
            var tspan = this.getItem(pos);
            if (tspan) {
                this.callMixin(pos);
                this.node.removeChild(tspan.node);
            }
        },
        setX: function (x) {
            this.node.setAttribute('x', x);
            return this;
        },
        setY: function (y) {
            this.node.setAttribute('y', y);
            return this;
        },
        getX: function () {
            return +this.node.getAttribute('x');
        },
        getY: function () {
            return +this.node.getAttribute('y');
        },
        setPath: function (path) {

        }
    });
});