define(function(require, exports, module) {

    var ShapeContainer = require('graphic/shapecontainer');
    var ViewBox = require('graphic/viewbox');

    return require('core/class').createClass('View', {
        mixins: [ShapeContainer, ViewBox],

        base: require('graphic/view'),

        constructor: function() {

            this.callBase('view');

        }

    });

});