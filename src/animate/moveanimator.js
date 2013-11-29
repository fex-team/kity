define( function ( require, exports, module ) {
    var Animator = require('animate/animator');

    var MoveAnimator = require('core/class').createClass('TranslateAnimator', {
        base: Animator,
        constructor: function(x, y) {
            this.callBase( {
                beginValue: function(target) {
                    return target.getTransform();
                },
                finishValue: function(target) {
                    return target.getTransform().translate(x, y);
                },
                setter: function(target, value) {
                    target.setTransform(value);
                }
            });
        }
    });

    var Shape = require('graphic/shape');

    require('core/class').extendClass(Shape, {
        move: function(x, y, duration, easing, delay, callback) {
            if(arguments.length == 2) {
                return this.translate(x, y);
            }
            return this.animate( new MoveAnimator(x, y), duration, easing, delay, callback );
        }
    });

    return MoveAnimator;
} );