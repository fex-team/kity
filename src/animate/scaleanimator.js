define(function(require, exports, module) {
    var Animator = require('animate/animator');
    var Matrix = require('graphic/matrix');

    var ScaleAnimator = require('core/class').createClass('ScaleAnimator', {
        base: Animator,
        constructor: function(sx, sy, ax, ay) {
            this.callBase({
                beginValue: 0,
                finishValue: 1,
                setter: function(target, value, timeline) {
                    var delta = timeline.getDelta();
                    var kx = Math.pow(sx, delta);
                    var ky = Math.pow(sy, delta);
                    target.scale(ky, kx);
                }
            });
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        fxScale: function(sx, sy, duration, easing, delay, callback) {
            return this.animate(new ScaleAnimator(sx, sy), duration, easing, delay, callback);
        }
    });

    return ScaleAnimator;
});