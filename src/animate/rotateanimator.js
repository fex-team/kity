define(function(require) {
    var Animator = require('animate/animator');

    var RotateAnimator = require('core/class').createClass('RotateAnimator', {
        base: Animator,
        constructor: function(deg, ax, ay) {
            this.callBase({
                beginValue: 0,
                finishValue: deg,
                setter: function(target, value, timeline) {
                    var delta = timeline.getDelta();
                    target.rotate(delta, ax, ay);
                }
            });
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        fxRotate: function(deg, duration, easing, delay, callback) {
            return this.animate(new RotateAnimator(deg), duration, easing, delay, callback);
        },
        fxRotateAnchor: function(deg, ax, ay, duration, easing, delay, callback) {
            return this.animate(new RotateAnimator(deg, ax, ay), duration, easing, delay, callback);
        }
    });

    return RotateAnimator;
});