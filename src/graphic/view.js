define(function(require, exports, module) {

    var ShapeContainer = require('./shapecontainer');
    var ViewBox = require('./viewbox');

    return require('../core/class').createClass('View', {
        mixins: [ShapeContainer, ViewBox],

        constructor: function() {
        }

    });

});
