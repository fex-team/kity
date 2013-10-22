/// import core/kity;
/// import core/utils;

function KityClass() {}
KityClass._classname = "KityClass";

KityClass.prototype.super = function( classname ) {
  var currentClass = this.constructor,
      superClass = currentClass._super;
  if(classname) {
    while(superClass._classname != classname && superClass._super)
      superClass = superClass._super;
  }
  classname = superClass._classname;
  
  var instance = this;
  var link = this._super_link = this._super_link || {};

  return link[classname] = link[classname] || (function(instance, proto) {
    var wrap = {};
    for(var m in proto) {
      if( proto.hasOwnProperty(m) && typeof(proto[m]) === 'function' ) {
        wrap[m] = (function(method, instance) {
          return function() {
            return method.apply(instance, arguments);
          }
        })(proto[m], instance);
      }
    }
    return wrap;
  })(instance, superClass.prototype);
};

// just for debug view
if(kity.debug) Function.prototype.toString = (function() {
  var origin = Function.prototype.toString;
  return function() {
    return this._classname || origin.apply(this);
  }
})();

// polyfill Object.create
function inherit(proto) {
  var Fn = proto.constructor
  var fn = new Fn();
  // delete members generated from Fn
  for(var m in fn) {
    if(!(m in proto)) delete fn[m];
  }
  return fn;
}

var root = kity;
function getNamespace(namespace) {
    var parts, path, current;

    if(!namespace) return root;

    parts = namespace.split('.')
    current = root;
    while( path = parts.shift() ) {
        current = current[path] || (current[path] = {});
    }
    return current;
}

function getClass( fullClassName ) {
    var splitpos, namespace, classname;

    splitpos = fullClassName.lastIndexOf('.')
    if(splitpos > 0) {
        namespace = fullClassName.substr(0, splitpos);
        classname = fullClassName.substr(splitpos + 1);
    } else {
        classname = fullClassName;
    }
    namespace = getNamespace(namespace);
    return {
        namespace: namespace,
        classname: classname,
        constructor: namespace[classname]
    };
}

// [option] defines.constructor Function 类构造函数
// [option] defines.super String
// [option] defines.mixin Array 混合
var define = kity.define = function (fullClassName, defines) {
    var constructor, superClass, superPrototype, classinfo, namespace, classname;

    classinfo = getClass(fullClassName);
    namespace = classinfo.namespace;
    classname = classinfo.classname;

    if(defines.constructor !== Object) {
      constructor = defines.constructor;
    } else {
      constructor = function() {};
    }

    if(defines.super) {
      superClass = getClass(defines.super).constructor;
    } else {
      superClass = KityClass;
    }

    // this class name is for super searching
    constructor._classname = classname;

    // inherit prototype
    constructor.prototype = inherit(superClass.prototype);

    // fix constructor
    constructor.prototype.constructor = constructor;

    // delete to prevent it from cloning to prototype
    delete defines["constructor"];

    // keep reference to super prototype
    constructor._super = superClass;
    delete defines["super"];


    if( utils.isArray(defines.mixin) ) {
      var i, length = defines.minxin.length;
      for(i = 0; i < length; i++) {
        var ext = getClass(defines.minxin[i]), 
          proto = ext.constructor.prototype;
        for(var m in proto) {
          constructor.prototype[m] = proto[m];
        }
      }      
      delete defines["minxin"];
    }

    for(var m in defines) {
      constructor.prototype[m] = defines[m];
    }

    return namespace[classname] = constructor;
}
