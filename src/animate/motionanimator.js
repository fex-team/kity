define(function(require) {
    var Animator = require('animate/animator');
    var g = require('graphic/geometry');

    var Path = require('graphic/path');

    var MotionAnimator = require('core/class').createClass('MotionAnimator', {
        base: Animator,
        constructor: function(path) {
            var me = this;
            this.callBase({
                beginValue: 0,
                finishValue: 1,
                setter: function(target, value) {
                    var path = me.motionPath instanceof Path ? me.motionPath.getPathData() : me.motionPath;
                    var point = g.pointAtPath(path, value);
                    target.setTranslate(point.x, point.y);
                    target.setRotate(point.tan.getAngle());
                }
            });
            this.updatePath(path);
        },

        updatePath: function(path) {
            this.motionPath = path;
        }
    });

    require('core/class').extendClass(Path, {
        motion: function(path, duration, easing, delay, callback) {
            return this.animate(new MotionAnimator(path), duration, easing, delay, callback);
        }
    });

    return MotionAnimator;
});