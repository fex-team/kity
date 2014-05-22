define(function(require) {
    var Animator = require('animate/animator');
    var g = require('graphic/geometry');

    var PathAnimator = require('core/class').createClass('OpacityAnimator', {
        base: Animator,
        constructor: function(path) {
            this.callBase({
                beginValue: function(target) {
                    this.beginPath = target.getPathData();
                    return 0;
                },
                finishValue: 1,
                setter: function(target, value) {
                    target.setPathData(g.pathTween(this.beginPath, path, value));
                }
            });
        }
    });

    var Path = require('graphic/path');

    require('core/class').extendClass(Path, {
        fxPath: function(path, duration, easing, delay, callback) {
            return this.animate(new PathAnimator(path), duration, easing, delay, callback);
        }
    });

    return PathAnimator;
});