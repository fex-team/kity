define(function (require, exports, module) {
    var Shape = require('graphic/shape');
    var Styled = require('graphic/styled');
    return require('core/class').createClass('TextSpan', {
        base: Shape,
        mixins: [Styled],
        constructor: function (content) {
            this.callBase('tspan');
        },
        clear: function () {
            while (this.node.removeChild(0)) {}
            return this;
        },
        setContent: function (content) {
            this.content = content;
            this.clear();
            this.node.appendChild(document.createTextNode(content));
            return this;
        },
        getContent: function () {
            return this.content;
        }
    });
});