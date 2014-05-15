define(function(require, exports, module) {

    return require('core/class').createClass('GradientBrush', {
        base: require('graphic/resource'),

        constructor: function(nodeType) {
            this.callBase(nodeType);
        }
    });

});