define(function(require) {
    var Animator = require('animate/animator');

    var TranslateAnimator = require('core/class').createClass('TranslateAnimator', {
        base: Animator,
        constructor: function(x, y) {
            this.callBase({
                x: 0,
                y: 0
            }, {
                x: x,
                y: y
            }, function(target, value, timeline) {
                var delta = timeline.getDelta();
                target.translate(delta.x, delta.y);
            });
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        fxTranslate: function(x, y, duration, easing, delay, callback) {
            return this.animate(new TranslateAnimator(x, y), duration, easing, delay, callback);
        }
    });

    return TranslateAnimator;
});