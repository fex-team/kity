define(function(require, exports, module) {
    var ShapeContainer = require('graphic/shapecontainer');
    return require('core/class').createClass('Group', {
        mixins: [ShapeContainer],
        base: require('graphic/shape'),

        constructor: function Group() {

            this.callBase('g');

        }

    });

});