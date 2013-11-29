/*
 * 效果类
 * 该类型的对象不存储任何内部属性， 所有操作都是针对该类对象所维护的节点进行的
 */

define( function ( require, exports, module ) {

    var svg = require( "graphic/svg"),

        Utils = require( "core/utils" ),

        Effect = require( "core/class" ).createClass( "Effect", {

            constructor: function ( type ) {

                this.node = svg.createNode( type );

            },

            set: function ( key, value ) {

                this.node.setAttribute( key, value );

                return this;

            },

            get: function ( key ) {

                return this.node.getAttribute( key );

            },

            /*
             * 设置input， 允许传递一个字符串或者另一个effect对象
             * 注意： 如果传递的是一个effect对象， 那么该对象的result属性将作为被设置effect对象的input值，
             *       如果该对象没有result属性， 则什么也不做。
             * */
            setIn: function ( effectInstance ) {

                setInput( 'in', this, effectInstance );

                return this;

            },

            setIn2: function ( effectInstance ) {

                setInput( 'in2', this, effectInstance );

                return this;

            },

            getNode: function () {

                return this.node;

            }

        } );

    function setInput ( type, effectObject, input ) {

        var result = null;

        if ( Utils.isString( input ) ) {

            result = input;

        } else {

            // 特效对象处理
            result = input.get( 'result' );

        }

        result && effectObject.set( type, result );

    }

    require( "core/utils" ).extend( Effect, {

        // 特效名称常量
        NAME_GAUSSIAN_BLUR: 'feGaussianBlur',
        NAME_OFFSET: 'feOffset',
        NAME_COMPOSITE: 'feComposite',
        NAME_COLOR_MATRIX: 'feColorMatrix',
        NAME_CONVOLVE_MATRIX: 'feConvolveMatrix',

        // 输入常量
        INPUT_SOURCE_GRAPHIC: 'SourceGraphic',
        INPUT_SOURCE_ALPHA: 'SourceAlpha',
        INPUT_BACKGROUND_IMAGE: 'BackgroundImage',
        INPUT_BACKGROUND_ALPHA: 'BackgroundAlpha',
        INPUT_FILL_PAINT: 'FillPaint',
        INPUT_STROKE_PAINT: 'StrokePaint'

    } );

    return Effect;

} );