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
define(function(require, exports, module){
    // fullClassName => Class 映射
    var classmap = {};
    var config = require("core/config");

    // 方便调试查看
    if(config.debug) {
        var origin = Function.prototype.toString;
        Function.prototype.toString = function() {
            return this._classname || origin.call(this);
        }
    }

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

    function getMixins( targetClass, mixins ) {
        return targetClass._mixins_;
    }

    function setMethodName( method, name ) {
        method._method_name_ = name;
    }

    function getMethodName( method ) {
        return method._method_name_;
    }

    function getInstanceClass( instance ) {
        return instance.constructor;
    }

    // 获得正在调用的函数所在的类
    function getCallerClass( caller, instance ) {
        var name = getMethodName( caller ),
            callerClass = getInstanceClass(instance);

        while(callerClass.prototype[name] != caller) {
            callerClass = getBase(callerClass);
        }
        return callerClass;
    }

    // 所有类的基类
    function BaseClass() {}
    setClassName( BaseClass, 'BaseClass' );

    // 提供 base 调用支持
    BaseClass.prototype.base = function( name ) {
        var caller = arguments.callee.caller;
        var method = getBase( getCallerClass( caller, this ) ).prototype[name];
        return method.apply( this, Array.prototype.slice.call(arguments, 1) );
    }

    // 直接调用 base 类的同名方法
    BaseClass.prototype.callBase = function() {
        var caller = arguments.callee.caller
        var method = getBase( getCallerClass( caller, this ) ).prototype[ getMethodName(caller) ];
        return method.apply( this, arguments );
    }

    BaseClass.prototype.mixin = function( name ) {        
        var caller = arguments.callee.caller;
        var method = getMixins( getCallerClass( caller, this ) )[ name ];
        return method.apply( this, Array.prototype.slice.call(arguments, 1) );
    }

    BaseClass.prototype.callMixin = function() {
        var caller = arguments.callee.caller;
        var method = getMixins( getCallerClass( caller, this ) )[ getMethodName(caller) ];
        return method.apply( this, arguments );
    }

    // 拆解包含命名空间的类名
    // "Kity.graphic.Shape" => {
    //     namespace : "Kity.graphic",
    //     classname : "Shape",
    //     constructor : <Class>
    // }
    function getClassInfo( fullClassName ) {
        var splitpos, namespace, classname;

        splitpos = fullClassName.lastIndexOf('.')
        if(splitpos > 0) {
                namespace = fullClassName.substr(0, splitpos);
                classname = fullClassName.substr(splitpos + 1);
        } else {
                classname = fullClassName;
        }
        return {
                namespace: namespace,
                classname: classname,
                constructor: classmap[fullClassName]
        };
    }

    function inherit(proto) {
        var Fn = proto.constructor
        var fn = new Fn();
        // 删除那些在父类构造函数中生成的变量，它们不应该被放在 prototype 上
        for(var m in fn) {
            if(!(m in proto)) delete fn[m];
        }
        return fn;
    }

    // 检查基类是否调用了父类的构造函数
    // 该检查是弱检查，假如调用的代码被注释了，同样能检查成功（这个特性可用于知道建议调用，但是出于某些原因不想调用的情况）
    function checkBaseConstructorCall( targetClass, classname ) {
        var code = targetClass.toString();
        if(!/this\.callBase/.test(code)) {
            throw new Error( classname + " : 类构造函数没有调用父类的构造函数！为了安全，请调用父类的构造函数");
        }
    }

    exports.createClass = function( fullClassName, defines ) { 
        var classinfo, classname, thisClass, baseClass;

        classinfo = getClassInfo( fullClassName );
        classname = classinfo.classname;

        if(defines.base) {
            baseClass = getClassInfo(defines.base).constructor;
        } else {
            baseClass = BaseClass;
        }

        if(defines.hasOwnProperty("constructor")) {
            thisClass = defines.constructor;
            if(baseClass != BaseClass) {
                checkBaseConstructorCall(thisClass, classname);
            }
        } else {
            thisClass = function() { this.callBase(); };
        }
        setMethodName( thisClass, 'constructor' );

        // 将类名写在构造器上，方便调试时查看
        setClassName(thisClass, classname);

        // 保存父类的引用
        setBase(thisClass, baseClass)

        // 继承父类的方法
        thisClass.prototype = inherit(baseClass.prototype);

        // 修正原型链上的构造函数
        thisClass.prototype.constructor = thisClass;

        // mixins
        if( defines.mixins instanceof Array ) {
            var mixins = {};
            var i, length = defines.mixins.length;
            for(i = 0; i < length; i++) {
                var mixin = getClassInfo(defines.mixins[i]), 
                    proto = mixin.constructor.prototype;
                for(var m in proto) {
                    // 构造函数不能拷贝
                    if(m !== 'constructor') {
                        // 现在不解析拓展之间的冲突
                        mixins[m] = thisClass.prototype[m] = proto[m];
                    }
                }
            }
            // 保存拓展的方法，改写后还能调用
            setMixins(thisClass, mixins);
        }


        // 下面这些不需要拷贝到原型链上
        delete defines["mixin"];
        delete defines["constructor"];
        delete defines["base"];

        for(var name in defines) {
            setMethodName ( thisClass.prototype[name] = defines[name], name );
        }

        return classmap[fullClassName] = thisClass;
    }
        
});
