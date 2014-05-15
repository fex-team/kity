/*
 * 图形事件包装类
 * */

define(function(require, exprots, module) {

    var Matrix = require('graphic/matrix'),
        Utils = require('core/utils'),
        Point = require('graphic/point');

    return require('core/class').createClass('ShapeEvent', {

        constructor: function(event) {

            var target = null;

            // dom 事件封装对象
            if (!Utils.isObject(event.target)) {

                this.type = event.type;

                target = event.target;

                // use标签有特殊属性， 需要区别对待
                if (target.correspondingUseElement) {

                    target = target.correspondingUseElement;

                }

                this.originEvent = event;
                this.targetShape =
                    target.shape ||
                    target.paper ||
                    event.currentTarget &&
                    (event.currentTarget.shape || event.currentTarget.paper);

                if (event._kityParam) {

                    Utils.extend(this, event._kityParam);

                }


                // 普通事件封装对象
            } else {

                Utils.extend(this, event);

            }

        },

        preventDefault: function() {

            var evt = this.originEvent;

            if (!evt) {
                return true;
            }

            if (evt.preventDefault) {

                evt.preventDefault();

                return evt.cancelable;

            } else {

                evt.returnValue = false;

                return true;

            }

        },

        //当前鼠标事件在用户坐标系中点击的点的坐标位置
        getPosition: function(refer, touchIndex) {

            if (!this.originEvent) {
                return null;
            }

            var eventClient = this.originEvent.touches ?
                this.originEvent.touches[touchIndex || 0] :
                this.originEvent;

            var clientX = eventClient && eventClient.clientX || 0,
                clientY = eventClient && eventClient.clientY || 0,
                node = this.targetShape.shapeNode || this.targetShape.node,

                // 鼠标位置在目标对象上的坐标
                // 基于屏幕坐标算
                point = Matrix.transformPoint(clientX, clientY, node.getScreenCTM().inverse());

            return Matrix.getCTM(this.targetShape, refer || 'view').transformPoint(point);

        },

        stopPropagation: function() {

            var evt = this.originEvent;

            if (!evt) {
                return true;
            }

            if (evt.stopPropagation) {

                evt.stopPropagation();

            } else {

                evt.cancelBubble = false;

            }

        }

    });

});