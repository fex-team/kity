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

    // just to bind context
    Function.prototype.bind = Function.prototype.bind || function ( thisObj ) {
        var args = Array.prototype.slice.call( arguments, 1 );
        return this.apply( thisObj, args );
    };

    var config = require( 'core/config' );

    // 方便调试查看
    if ( config.debug ) {
        var origin = Object.prototype.toString;
        Object.prototype.toString = function () {
            return this.__KityClassName || origin.call( this );
        };
    }

    // 所有类的基类
    function Class() {}
    Class.__KityClassName = 'Class';

    function getCallerClass( instance, caller ) {
        var currentClass = instance.constructor;
    }

    // 提供 base 调用支持
    Class.prototype.base = function ( name ) {
        var caller = arguments.callee.caller;
        var method = caller.__KityMethodClass.__KityBaseClass.prototype[ name ];
        return method.apply( this, Array.prototype.slice.call( arguments, 1 ) );
    };

    // 直接调用 base 类的同名方法
    Class.prototype.callBase = function () {
        var caller = arguments.callee.caller;
        var method = caller.__KityMethodClass.__KityBaseClass.prototype[ caller.__KityMethodName ];
        return method.apply( this, arguments );
    };

    Class.prototype.mixin = function ( name ) {
        var caller = arguments.callee.caller;
        var mixins = caller.__KityMethodClass.__KityMixins;
        if ( !mixins ) {
            return this;
        }
        var method = mixins[ name ];
        return method.apply( this, Array.prototype.slice.call( arguments, 1 ) );
    };

    Class.prototype.callMixin = function () {
        var caller = arguments.callee.caller;
        var methodName = caller.__KityMethodName;
        var mixins = caller.__KityMethodClass.__KityMixins;
        if ( !mixins ) {
            return this;
        }
        var method = mixins[ methodName ];
        if ( methodName == 'constructor' ) {
            for ( var i = 0, l = method.length; i < l; i++ ) {
                method[ i ].call( this );
            }
            return this;
        } else {
            return method.apply( this, arguments );
        }
    };

    Class.prototype.pipe = function ( fn ) {
        if ( typeof ( fn ) == 'function' ) {
            fn.call( this, this );
        }
        return this;
    };

    Class.prototype.getType = function () {
        return this.__KityClassName;
    };

    // 检查基类是否调用了父类的构造函数
    // 该检查是弱检查，假如调用的代码被注释了，同样能检查成功（这个特性可用于知道建议调用，但是出于某些原因不想调用的情况）
    function checkBaseConstructorCall( targetClass, classname ) {
        var code = targetClass.toString();
        if ( !/this\.callBase/.test( code ) ) {
            throw new Error( classname + ' : 类构造函数没有调用父类的构造函数！为了安全，请调用父类的构造函数' );
        }
    }

    function checkMixinConstructorCall( targetClass, classname ) {
        var code = targetClass.toString();
        if ( !/this\.callMixin/.test( code ) ) {
            throw new Error( classname + ' : 类构造函数没有调用父类的构造函数！为了安全，请调用父类的构造函数' );
        }
    }

    var KITY_INHERIT_FLAG = '__KITY_INHERIT_FLAG_' + ( +new Date() );

    function inherit( constructor, BaseClass, classname ) {
        var KityClass = eval( '(function ' + classname + '( __inherit__flag ) {' +
            'if( __inherit__flag != KITY_INHERIT_FLAG ) {' +
            'KityClass.__KityConstructor.apply(this, arguments);' +
            '}' +
            'this.__KityClassName = KityClass.__KityClassName;' +
            '})' );
        KityClass.__KityConstructor = constructor;

        KityClass.prototype = new BaseClass( KITY_INHERIT_FLAG );

        for ( var methodName in BaseClass.prototype ) {
            if ( BaseClass.prototype.hasOwnProperty( methodName ) && methodName.indexOf( '__Kity' ) !== 0 ) {
                KityClass.prototype[ methodName ] = BaseClass.prototype[ methodName ];
            }
        }

        KityClass.prototype.constructor = KityClass;

        return KityClass;
    }

    function mixin( NewClass, mixins ) {
        if ( false === mixins instanceof Array ) {
            return NewClass;
        }

        var i, length = mixins.length,
            proto, method;

        NewClass.__KityMixins = {
            constructor: []
        };

        for ( i = 0; i < length; i++ ) {
            proto = mixins[ i ].prototype;

            for ( method in proto ) {
                if ( false === proto.hasOwnProperty( method ) || method.indexOf( '__Kity' ) === 0 ) {
                    continue;
                }
                if ( method === 'constructor' ) {
                    // constructor 特殊处理
                    NewClass.__KityMixins.constructor.push( proto[ method ] );
                } else {
                    NewClass.prototype[ method ] = NewClass.__KityMixins[ method ] = proto[ method ];
                }
            }
        }

        return NewClass;
    }

    function extend( BaseClass, extension ) {
        if ( extension.__KityClassName ) {
            extension = extension.prototype;
        }
        for ( var methodName in extension ) {
            if ( extension.hasOwnProperty( methodName ) &&
                methodName.indexOf( '__Kity' ) &&
                methodName != 'constructor' ) {
                var method = BaseClass.prototype[ methodName ] = extension[ methodName ];
                method.__KityMethodClass = BaseClass;
                method.__KityMethodName = methodName;
            }
        }
        return BaseClass;
    }

    Class.prototype._accessProperty = function () {
        return this._propertyRawData || ( this._propertyRawData = {} );
    };

    function upperCamael( name ) {
        return name.substr( 0, 1 ).toUpperCase() + name.substr( 1 );
    }

    function generateGetMethodFor( classProto, name, propDefine ) {
        var methodName = ( propDefine.bool ? 'is' : 'get' ) + upperCamael( name ),
            index;
        if ( propDefine instanceof Array && ~propDefine.indexOf( 'get' ) ) {

        }
        if ( typeof ( get ) == 'function' ) {
            classProto[ methodName ] = function () {
                return get( this._accessProperty()[ name ] );
            };
        } else {
            classProto[ methodName ] = function () {
                var p = this._accessProperty();
                return name in p ? p[ name ] : ( p[ name ] = 'get' );
            };
        }
    }

    function generateSetMethodFor( classProto, name, set ) {
        var methodName = 'set' + name.substr( 0, 1 ).toUpperCase() + name.substr( 1 );
        if ( typeof ( set ) == 'function' ) {
            classProto[ methodName ] = function () {
                var args = Array.prototype.slice.call( arguments );
                var p = this._accessProperty();
                args.unshift( function ( value ) {
                    p[ name ] = value;
                } );
                var ret = set.apply( this, args );
                return ret !== undefined && set.chain ? this : ret;
            };
        } else {
            classProto[ methodName ] = function ( value ) {
                this._accessProperty()[ name ] = value;
                return this;
            };
        }
    }

    function generatePropertyFor( classProto, defines ) {
        var name, propDefine;
        for ( name in defines ) {
            if ( !defines.hasOwnProperty( name ) || typeof ( defines[ name ] ) == 'function' ) {
                continue;
            }
            propDefine = defines[ name ];
            generateGetMethodFor( classProto, name, propDefine );
            generateSetMethodFor( classProto, name, propDefine );
        }
    }

    exports.createClass = function ( classname, defines ) {
        var constructor, NewClass, BaseClass;

        if ( arguments.length === 1 ) {
            defines = arguments[ 0 ];
            classname = 'AnonymousClass';
        }

        BaseClass = defines.base || Class;

        if ( defines.hasOwnProperty( 'constructor' ) ) {
            constructor = defines.constructor;
            if ( BaseClass != Class ) {
                checkBaseConstructorCall( constructor, classname );
            }
        } else {
            constructor = function () {
                this.callBase.apply( this, arguments );
                this.callMixin.apply( this, arguments );
            };
        }

        NewClass = inherit( constructor, BaseClass, classname );
        NewClass = mixin( NewClass, defines.mixins );

        NewClass.__KityClassName = constructor.__KityClassName = classname;
        NewClass.__KityBaseClass = constructor.__KityBaseClass = BaseClass;

        NewClass.__KityMethodName = constructor.__KityMethodName = 'constructor';
        NewClass.__KityMethodClass = constructor.__KityMethodClass = NewClass;

        // 下面这些不需要拷贝到原型链上
        delete defines.mixins;
        delete defines.constructor;
        delete defines.base;

        generatePropertyFor( NewClass, defines );
        
        NewClass = extend( NewClass, defines );

        return NewClass;
    };

    exports.extendClass = extend;

} );