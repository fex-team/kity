var global = window;

function KityClass() {

}

function getNamespace(namespace) {
	var parts, path, current;

	if(!namespace) return global;

	parts = namespace.split('.')
	current = global;
	while( path = paths.shift() ) {
		current = current[paths] || (current[path] = {});
	}
	return current;
}

function getClass( fullClassName ) {
	var splitpos, namespace, classname;

	splitpos = fullClassName.lastIndexOf('.')
	if(splitpos > 0) {
		namespace = fullClassName.subtr(0, splitpos);
        classname = fullClassName.subtr(splitpos + 1);
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

function define(fullClassName, defines) {
   	var constructor, superClass, superPrototype, classinfo, namespace, classname;

   	classinfo = getClass(fullClassName);
   	namespace = classinfo.namespace;
   	classname = classinfo.classname;

   	if(defines.super) {
   		superClass = getClass(defines.super).constructor;
   	} else {
   		superClass = KityClass;
   	}

    namespace[classname] = constructor = defines.constructor === Object ? function() {} : defines.constructor;

    constructor.prototype = new superClass();
    constructor.prototype._classname = classname;
    constructor.prototype.constructor = constructor;
    delete defines["constructor"];

    constructor.prototype._super = superClass.prototype;
    constructor.prototype.super = function(_super) {
      var _super = _super || this._super,
        _classname = _super._classname || '__TopClass',
        _link = this._classLink = this.__classLink || {};
      
      if(!_link[_classname]) {
        var _methods = _link[_classname] = {};
        var _instance = this;
        for(var m in _super) {
          if(_super[m] instanceof Function) {
            _methods[m] = (function() {
              var method = _super[m];
              var _super2 = _super;
              if(m === 'super') {
                return function() {
                  method.apply(_instance, [_super2]);
                }
              }
              return function() {
                method.apply(_instance, arguments);
              }
            })();
          }
        }
      }

      return _link[_classname];
    }
    delete defines["super"];

    if(defines.extend) {
      var i, length = defines.extend.length;
      for(i = 0; i < length; i++) {
        var ext = getClass(defines.extend[i]);
        for(var m in ext.constructor.prototype) {
          constructor.prototype[m] = ext.constructor.prototype[m];
        }
      }
    }
    delete defines["extend"];

    for(var m in defines) {
      constructor.prototype[m] = defines[m];
    }
}































