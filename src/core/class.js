/**
 * @description 创建一个类
 * @param {String}    fullClassName  类全名，包括命名空间。
 * @param {Plain}     defines        要创建的类的特性
 *     defines.constructor  {Function}       类的构造函数，实例化的时候会被调用。
 *     defines.base         {String}         基类的名称。名称要使用全名。（因为base是javascript未来保留字，所以不用base）
 *     defines.mixin        {Array<String>}  要混合到新类的类集合
 *     defines.<method>     {Function}       其他类方法
 *
 * TODO:
 *     Mixin 构造函数调用支持
 */
define( function ( require, exports ) {

    var config = require( 'core/config' );

    function setClassName( targetClass, name ) {
        targetClass._class_name_ = name;
    }

    function getClassName( targetClass ) {
        return targetClass._class_name_;
    }

    function setBase( targetClass, baseClass ) {
        targetClass._base_ = baseClass;
    }

    function getBase( targetClass ) {
        return targetClass._base_;
    }

    function setMixins( targetClass, mixins ) {
        targetClass._mixins_ = mixins;
    }

    function getMixins( targetClass ) {
        return targetClass._mixins_;
    }

    function setMethodName( method, name ) {
        method._method_name_ = name;
    }

    function getMethodName( method ) {
        return method._method_name_;
    }

    function setMethodDefine( method, proto ) {
        method._method_define_ = proto;
    }

    function getMethodDefine( method ) {
        return method._method_define_;
    }

    function getInstanceClass( instance ) {
        return instance.constructor;
    }

    // 方便调试查看
    if ( config.debug ) {
        var origin = Function.prototype.toString;
        Function.prototype.toString = function () {
            return getClassName( this ) || origin.call( this );
        };
    }

    // 获得正在调用的函数所在的类
    function getCallerClass( caller ) {
        return getMethodDefine( caller ).constructor;
    }

    // 所有类的基类
    function BaseClass() {}

    setClassName( BaseClass, 'BaseClass' );

    // 提供 base 调用支持
    BaseClass.prototype.base = function ( name ) {
        var caller = arguments.callee.caller;
        var method = getBase( getCallerClass( caller ) ).prototype[ name ];
        return method.apply( this, Array.prototype.slice.call( arguments, 1 ) );
    };

    // 直接调用 base 类的同名方法
    BaseClass.prototype.callBase = function () {
        var caller = arguments.callee.caller;
        var method = getBase( getCallerClass( caller ) ).prototype[ getMethodName( caller ) ];
        return method.apply( this, arguments );
    };

    BaseClass.prototype.mixin = function ( name ) {
        var caller = arguments.callee.caller;
        var method = getMixins( getCallerClass( caller ) )[ name ];
        return method.apply( this, Array.prototype.slice.call( arguments, 1 ) );
    };

    BaseClass.prototype.callMixin = function () {
        var caller = arguments.callee.caller;
        var methodName = getMethodName( caller );
        var method = getMixins( getCallerClass( caller ) )[ methodName ];
        if ( methodName == 'constructor' ) {
            for ( var i = 0, l = method.length; i < l; i++ ) {
                method[ i ].call( this );
            }
        } else {
            return method.apply( this, arguments );
        }
    };

    BaseClass.prototype.isInstanceOf = function ( targetClass ) {
        var currentClass = this.constructor;
        while ( currentClass ) {
            if ( currentClass == targetClass ) {
                return true;
            }
            currentClass = getBase( currentClass );
        }
        return false;
    };

    // 检查基类是否调用了父类的构造函数
    // 该检查是弱检查，假如调用的代码被注释了，同样能检查成功（这个特性可用于知道建议调用，但是出于某些原因不想调用的情况）
    function checkBaseConstructorCall( targetClass, classname ) {
        var code = targetClass.toString();
        if ( !/this\.callBase/.test( code ) ) {
            throw new Error( classname + ' : 类构造函数没有调用父类的构造函数！为了安全，请调用父类的构造函数' );
        }
    }

    function extend( target, proto, originDefined ) {
        for ( var name in proto ) {
            if ( proto.hasOwnProperty( name ) && name != 'constructor' ) {
                setMethodName( target[ name ] = proto[ name ], name );
                if ( originDefined ) {
                    setMethodDefine( target[ name ], target );
                }
            }
        }
    }

    exports.createClass = function ( classname, defines ) {
        var thisClass, baseClass;

        baseClass = defines.base || BaseClass;

        if ( defines.hasOwnProperty( 'constructor' ) ) {
            thisClass = defines.constructor;
            if ( baseClass != BaseClass ) {
                checkBaseConstructorCall( thisClass, classname );
            }
        } else {
            thisClass = function () {
                this.callBase();
            };
        }

        // 将类名写在构造器上，方便调试时查看
        setClassName( thisClass, classname );

        // 构造函数起名，用于调用父类构造函数
        setMethodName( thisClass, 'constructor' );

        // 保存父类的引用
        setBase( thisClass, baseClass );

        thisClass.prototype = new BaseClass();

        if(baseClass != BaseClass) {
            // 继承父类的方法
            extend( thisClass.prototype, baseClass.prototype );
        }

        // 修正原型链上的构造函数
        thisClass.prototype.constructor = thisClass;
        setMethodDefine( thisClass, thisClass.prototype );

        // mixins
        if ( defines.mixins instanceof Array ) {
            var mixins = {
                constructor: []
            };
            var i, length = defines.mixins.length;
            for ( i = 0; i < length; i++ ) {
                var mixinProto = defines.mixins[ i ].prototype;
                extend( thisClass.prototype, mixinProto );
                extend( mixins, mixinProto );
                if ( mixinProto.hasOwnProperty( 'constructor' ) ) {
                    mixins.constructor.push( mixinProto.constructor );
                }
            }
            // 保存拓展的方法，改写后还能调用
            setMixins( thisClass, mixins );
        }


        // 下面这些不需要拷贝到原型链上
        delete defines.mixins;
        delete defines.constructor;
        delete defines.base;

        extend( thisClass.prototype, defines, true );
        return thisClass;
    };

    exports.extendClass = function ( targetClass, proto ) {
        extend( targetClass.prototype, proto );
    };

} );