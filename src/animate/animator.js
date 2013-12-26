define(function(require, exports, module) {

    function parseTime(str) {
        var value = parseFloat(str, 10);
        if (/ms/.test(str)) {
            return value;
        }
        if (/s/.test(str)) {
            return value * 1000;
        }
        if (/min/.test(str)) {
            return value * 60 * 1000;
        }
        return value;
    }

    var Timeline = require('animate/timeline');
    var easingTable = require('animate/easing');

    var Animator = require('core/class').createClass('Animator', {

        constructor: function(beginValue, finishValue, setter) {
            if (arguments.length == 1) {
                var opt = arguments[0];
                this.beginVal = opt.beginValue;
                this.finishVal = opt.finishValue;
                this.setter = opt.setter;
            } else {
                this.beginVal = beginValue;
                this.finishVal = finishValue;
                this.setter = setter;
            }
        },

        start: function(target, duration, easing, delay, callback) {
            if (arguments.length === 4 && typeof(delay) == 'function') {
                callback = delay;
                delay = 0;
            }
            var timeline = this.create(target, duration, easing, callback);
            delay = parseTime(delay);
            if (delay > 0) {
                setTimeout(function() {
                    timeline.play();
                }, delay);
            } else {
                timeline.play();
            }
            return timeline;
        },

        create: function(target, duration, easing, callback) {
            var timeline;

            duration = duration && parseTime(duration) || Animator.DEFAULT_DURATION;
            easing = easing || Animator.DEFAULT_EASING;

            if (typeof(easing) == 'string') {
                easing = easingTable[easing];
            }

            timeline = new Timeline(this, target, duration, easing);

            if (typeof(callback) == 'function') {
                timeline.on('finish', callback);
            }
            return timeline;
        },

        reverse: function() {
            return new Animator(this.finishVal, this.beginVal, this.setter);
        }

    });

    Animator.DEFAULT_DURATION = 300;
    Animator.DEFAULT_EASING = 'linear';

    var Shape = require('graphic/shape');
    require('core/class').extendClass(Shape, {
        animate: function(animator, duration, easing, delay, callback) {
            var queue = this._KityAnimateQueue = this._KityAnimateQueue || [];
            var timeline = animator.create(this, duration, easing, callback);

            function dequeue() {
                queue.shift();
                if (queue.length) {
                    setTimeout(queue[0].t.play.bind(queue[0].t), queue[0].d);
                }
            }
            timeline.on('finish', dequeue);
            queue.push({
                t: timeline,
                d: delay
            });
            if (queue.length == 1) {
                setTimeout(timeline.play.bind(timeline), delay);
            }
            return this;
        },
        stop: function() {
            var queue = this._KityAnimateQueue;
            if (queue) {
                while (queue.length) {
                    queue.shift().stop();
                }
            }
        }
    });

    return Animator;
});