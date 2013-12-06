define( function ( require, exports, module ) {

    var Color = require( 'graphic/color' );
    var Matrix = require( 'graphic/matrix' );
    var EventHandler = require( 'graphic/eventhandler' );


    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    var globalFrameAction = [];

    function execGlobalFrameAction() {
        var pending = globalFrameAction;
        globalFrameAction = [];
        while ( pending.length ) {
            pending.shift()();
        }
        requestAnimationFrame( execGlobalFrameAction );
    }

    execGlobalFrameAction();

    function paralle( v1, v2, op ) {
        if ( false === isNaN( parseFloat( v1 ) ) ) {
            return op( v1, v2 );
        }
        var value = {};
        for ( var n in v1 ) {
            if ( v1.hasOwnProperty( n ) ) {
                value[ n ] = paralle( v1[ n ], v2[ n ], op );
            }
        }
        return value;
    }

    function getDelta( v1, v2 ) {
        return paralle( v1, v2, function ( v1, v2 ) {
            return v2 - v1;
        } );
    }

    // 不会深度遍历
    function getPercentValue( b, f, p ) {
        return paralle( b, f, function ( b, f ) {
            return b + ( f - b ) * p;
        } );
    }

    function TimelineEvent( timeline, type, param ) {
        this.timeline = timeline;
        this.target = timeline.target;
        this.type = type;
        for ( var name in param ) {
            if ( param.hasOwnProperty( name ) ) {
                this[ name ] = param[ name ];
            }
        }
    }

    var Timeline = require( 'core/class' ).createClass( 'Timeline', {
        mixins: [ EventHandler ],
        constructor: function ( animator, target, duration, easing ) {
            this.time = 0;
            this.duration = duration;
            this.target = target;
            this.easing = easing;
            this.status = 'ready';
            this.animator = animator;
            this.beginVal = animator.beginVal;
            this.finishVal = animator.finishVal;
            this.setter = animator.setter;
        },
        guessValueType: function () {
            var value = this.beginVal;
            if ( parseFloat( value ) ) {
                this.valueType = 'number';
                return;
            }
            // string as color
            if ( typeof ( value ) == 'string' || value instanceof Color ) {
                this.valueType = 'color';
                return;
            }
            if ( value.x && value.y ) {
                this.valueType = 'point';
                return;
            }
            if ( value instanceof Matrix ) {
                this.valueType = 'matrix';
            }
        },
        nextFrame: function () {
            if ( this.status != 'playing' ) {
                return;
            }

            var ts = +new Date(),
                lts = this.lastFrameTS || 0,
                elapsed = ts - lts;
            var target = this.target,
                setter = this.setter;

            // 
            // 1. 首次播放 lts 为 0，则修正 elapsed 为一帧的长度
            // 
            // 2. 浏览器最小化或切换标签，requestAnimationFrame 不会执行。
            //    检测时间超过 200 ms（频率小于 5Hz ） 判定为计时器暂停，重置为一帧长度
            //    
            //    ref: http://stackoverflow.com/questions/13133434/requestanimationframe-detect-stop
            if ( elapsed > 200 ) {
                elapsed = 1000 / 60;
            }
            this.time += elapsed;

            this.setValue( this.getValue() );
            this.lastFrameTS = ts;

            if ( this.time >= this.duration ) {
                this.timeUp();
            }

            globalFrameAction.push( this.nextFrame.bind( this ) );
        },
        getPlayTime: function () {
            return this.rollbacking ? this.duration - this.time : this.time;
        },
        getValue: function () {
            var b = this.beginVal,
                f = this.finishVal,
                p = this.easing( this.getPlayTime(), 0, 1, this.duration ),
                v;

            switch ( this.valueType ) {
            case 'color':
                b = b.getValues();
                f = f.getValues();
                v = getPercentValue( b, f, p );
                return Color.createRGBA( v.r, v.g, v.b, v.a );
            case 'matrix':
                b = b.getMatrix();
                f = f.getMatrix();
                v = getPercentValue( b, f, p );
                return new Matrix( v );
            default:
                return getPercentValue( b, f, p );
            }
        },
        getDelta: function() {
            this.lastValue = this.lastValue || this.beginVal;
            return getDelta( this.lastValue, this.currentValue );
        },
        setValue: function ( value, lastValue ) {
            this.currentValue = value;
            this.setter.call( this.target, this.target, value, this );
            this.lastValue = value;
        },
        play: function () {
            var ctx = this.context;
            var me = this;
            var lastStatus = this.status;
            this.status = 'playing';
            switch ( lastStatus ) {
            case 'ready':
                this.beginVal = typeof ( this.beginVal ) == 'function' ?
                    this.beginVal.call( this.target, this.target ) :
                    this.beginVal;
                this.finishVal = typeof ( this.finishVal ) == 'function' ?
                    this.finishVal.call( this.target, this.target ) :
                    this.finishVal;
                this.time = 0;
                this.guessValueType();
                this.nextFrame();
                break;
            case 'finished':
            case 'stoped':
                this.time = 0;
                this.nextFrame();
                break;
            case 'paused':
                this.lastFrameTS = 0;
                this.nextFrame();
            }
            this.fire( 'play', new TimelineEvent( this, 'play', {
                lastStatus: lastStatus
            } ) );
            return this;
        },
        pause: function () {
            this.status = 'paused';
            this.fire( 'pause', new TimelineEvent( this, 'pause' ) );
            return this;
        },
        stop: function () {
            this.status = 'stoped';
            this.setValue( this.finishVal );
            this.rollbacking = false;
            this.fire( 'stop', new TimelineEvent( this, 'stop' ) );
            return this;
        },
        reset: function() {
            this.setValue( this.beginVal );
        },
        timeUp: function () {
            if ( this.repeatOption ) {
                this.time = 0;
                if ( this.rollback ) {
                    if ( this.rollbacking ) {
                        this.decreaseRepeat();
                        this.rollbacking = false;
                    } else {
                        this.rollbacking = true;
                        this.fire( 'rollback', new TimelineEvent( this, 'rollback' ) );
                    }
                } else {
                    this.decreaseRepeat();
                }
                if ( !this.repeatOption ) {
                    this.finish();
                } else {
                    this.fire( 'repeat', new TimelineEvent( this, 'repeat' ) );
                }
            } else {
                this.finish();
            }
        },
        finish: function () {
            this.setValue( this.finishVal );
            this.status = 'finished';
            this.fire( 'finish', new TimelineEvent( this, 'finish' ) );
        },
        decreaseRepeat: function () {
            if ( this.repeatOption !== true ) {
                this.repeatOption--;
            }
        },
        repeat: function ( repeat, rollback ) {
            this.repeatOption = repeat;
            this.rollback = rollback;
            return this;
        }
    } );

    return Timeline;
} );