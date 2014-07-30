/**
 * @fileOverview
 *
 * 绘制和使用圆形
 */

define(function(require, exports, module) {

    /**
     * @class kity.Circle
     * @base kity.Ellipse
     * @description 表示一个圆形
     */
    return require('core/class').createClass('Circle', {

        base: require('graphic/ellipse'),

        /**
         * @constructor
         * @for kity.Circle
         *
         * @param  {[type]} radius [description]
         * @param  {[type]} cx     [description]
         * @param  {[type]} cy     [description]
         *
         * @return {[type]}        [description]
         */
        constructor: function(radius, cx, cy) {
            this.callBase(radius, radius, cx, cy);
        },

        getRadius: function() {
            return this.getRadiusX();
        },

        setRadius: function(radius) {
            return this.callBase(radius, radius);
        }

    });
});