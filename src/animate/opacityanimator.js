define(function(require, exports, module) {
    var Animator = require('animate/animator');
    var Matrix = require('graphic/matrix');

    var OpacityAnimator = require('core/class').createClass('OpacityAnimator', {
        base: Animator,
        constructor: function(opacity) {
            this.callBase({
                beginValue: function(target) {
                    return target.getOpacity();
                },
                finishValue: opacity,
                setter: function(target, value) {
                    target.setOpacity(value);
                }
            });
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        fxOpacity: function(opacity, duration, easing, delay, callback) {
            return this.animate(new OpacityAnimator(opacity), duration, easing, delay, callback);
        },
        fadeTo: function() {
            return this.fxOpacity.apply(this, arguments);
        },
        fadeIn: function() {
            return this.fxOpacity.apply(this, [1].concat([].slice.call(arguments)));
        },
        fadeOut: function() {
            return this.fxOpacity.apply(this, [0].concat([].slice.call(arguments)));
        }
    });

    return OpacityAnimator;
});