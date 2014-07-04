define(function(require) {

    var EventHandler = require('graphic/eventhandler');

    var frame = require('animate/frame');

    var utils = require('core/utils');

    function getPercentValue(b, f, p) {
        return utils.paralle(b, f, function(b, f) {
            return b + (f - b) * p;
        });
    }

    function getDelta(v1, v2) {
        return utils.paralle(v1, v2, function(v1, v2) {
            return v2 - v1;
        });
    }

    function TimelineEvent(timeline, type, param) {
        this.timeline = timeline;
        this.target = timeline.target;
        this.type = type;
        for (var name in param) {
            if (param.hasOwnProperty(name)) {
                this[name] = param[name];
            }
        }
    }

    var Timeline = require('core/class').createClass('Timeline', {

        mixins: [EventHandler],

        constructor: function(animator, target, duration, easing) {
            this.callMixin();

            this.target = target;

            this.time = 0;
            this.duration = duration;

            this.easing = easing;
            this.animator = animator;
            this.beginValue = animator.beginValue;
            this.finishValue = animator.finishValue;
            this.setter = animator.setter;

            this.status = 'ready';
        },

        nextFrame: function(frame) {
            if (this.status != 'playing') {
                return;
            }

            this.time += frame.dur;

            this.setValue(this.getValue());

            if (this.time >= this.duration) {
                this.timeUp();
            }

            frame.next();
        },

        getPlayTime: function() {
            return this.rollbacking ? this.duration - this.time : this.time;
        },

        getTimeProportion: function() {
            return this.getPlayTime() / this.duration;
        },

        getValueProportion: function() {
            return this.easing(this.getPlayTime(), 0, 1, this.duration);
        },

        getValue: function() {
            var b = this.beginValue;
            var f = this.finishValue;
            var p = this.getValueProportion();
            return getPercentValue(b, f, p);
        },

        setValue: function(value) {
            this.lastValue = this.currentValue;
            this.currentValue = value;
            this.setter.call(this.target, this.target, value, this);
        },

        getDelta: function() {
            this.lastValue = this.lastValue === undefined ? this.beginValue : this.lastValue;
            return getDelta(this.lastValue, this.currentValue);
        },

        play: function() {
            var lastStatus = this.status;
            this.status = 'playing';

            switch (lastStatus) {

                case 'ready':
                    if (utils.isFunction(this.beginValue)) {
                        this.beginValue = this.beginValue.call(this.target, this.target);
                    }
                    if (utils.isFunction(this.finishValue)) {
                        this.finishValue = this.finishValue.call(this.target, this.target);
                    }
                    this.time = 0;
                    this.setValue(this.beginValue);
                    this.frame = frame.requestFrame(this.nextFrame.bind(this));
                    break;

                case 'finished':
                case 'stoped':
                    this.time = 0;
                    this.frame = frame.requestFrame(this.nextFrame.bind(this));
                    break;

                case 'paused':
                    this.frame.next();
            }

            this.fire('play', new TimelineEvent(this, 'play', {
                lastStatus: lastStatus
            }));

            return this;
        },
        pause: function() {
            this.status = 'paused';
            this.fire('pause', new TimelineEvent(this, 'pause'));
            frame.releaseFrame(this.frame);
            return this;
        },
        stop: function() {
            this.status = 'stoped';
            this.setValue(this.finishValue);
            this.rollbacking = false;
            this.fire('stop', new TimelineEvent(this, 'stop'));
            frame.releaseFrame(this.frame);
            return this;
        },
        timeUp: function() {
            if (this.repeatOption) {
                this.time = 0;
                if (this.rollback) {
                    if (this.rollbacking) {
                        this.decreaseRepeat();
                        this.rollbacking = false;
                    } else {
                        this.rollbacking = true;
                        this.fire('rollback', new TimelineEvent(this, 'rollback'));
                    }
                } else {
                    this.decreaseRepeat();
                }
                if (!this.repeatOption) {
                    this.finish();
                } else {
                    this.fire('repeat', new TimelineEvent(this, 'repeat'));
                }
            } else {
                this.finish();
            }
        },
        finish: function() {
            this.setValue(this.finishValue);
            this.status = 'finished';
            this.fire('finish', new TimelineEvent(this, 'finish'));
            frame.releaseFrame(this.frame);
        },
        decreaseRepeat: function() {
            if (this.repeatOption !== true) {
                this.repeatOption--;
            }
        },
        repeat: function(repeat, rollback) {
            this.repeatOption = repeat;
            this.rollback = rollback;
            return this;
        }
    });
    Timeline.requestFrame = frame.requestFrame;
    Timeline.releaseFrame = frame.releaseFrame;
    return Timeline;
});