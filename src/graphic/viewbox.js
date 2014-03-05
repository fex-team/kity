define(function(require, exports, module) {
    return require('core/class').createClass('ViewBox', {

        getViewBox: function() {
            var attr = this.node.getAttribute('viewBox');
            if (attr === null) {
                return {
                    x: 0,
                    y: 0,
                    width: this.node.clientWidth || this.node.parentNode.clientWidth,
                    height: this.node.clientHeight || this.node.parentNode.clientHeight
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
        }
    });

});