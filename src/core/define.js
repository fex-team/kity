var _Object = function(){};

function _createObj(ClassObj,pro){
    var obj;
    if(Object.create){
        obj =  Object.create(ClassObj.prototype)
    }else {
        var _fn = function(){};
        utils.extend(_fn.prototype,ClassObj.prototype);
        obj = new _fn;
    }
    return utils.extend(obj,pro)
}
function _createClass(ClassObj,properties,superClass){
    utils.extend(ClassObj.prototype,
        properties,
        (Kity[superClass]||_Object).prototype,
        true
    );
    ClassObj.prototype.super =  ( Kity[superClass] || _Object ).prototype;
    ClassObj.guid = 0;
    return ClassObj;
}

function define(className,properties,superClass){
    var ClassObj = Kity[className] = _createClass(function(){

        var _obj = _createObj(ClassObj,{
            _objname : className,
            _guid :  ClassObj.guid++,
            options: utils.extend({},ClassObj.prototype.options||{})
        });
        _obj.init && _obj.init.apply(_obj,arguments);
        return _obj;
    },properties,superClass)
}

Kity.define = define;