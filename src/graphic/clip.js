/**
 * @fileOverview
 *
 * 支持图形剪辑
 */

define(function(require, exports, module) {
    var Class = require('../core/class');
    var Shape = require('./shape');

    var Clip = Class.createClass('Clip', {

        base: Shape,
        mixins: [require('./shapecontainer')],

        constructor: function() {

            this.callBase('clipPath');

        },

        clip: function(shape) {

            shape.getNode().setAttribute('clip-path', 'url(#' + this.getId() + ')');
            return this;

        }

    });

    Class.extendClass(Shape, {
        clipWith: function(clip) {
            clip.clip(this);
            return this;
        }
    });

    return Clip;

});