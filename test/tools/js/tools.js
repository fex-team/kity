/**
 * Created with JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-11
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function removeClass(obj, cls) {
    var clsArray= cls.split( " ");
    for(var i=0;i<clsArray.length;i++){
        if (hasClass(obj, clsArray[i])) {
            var reg = new RegExp('(\\s|^)' + clsArray[i] + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }
}

function slideToggle(obj){
    //todo 先写个大意,待完成
    if(obj.style.display=='none'){

    }else{
        obj.style.display='block';
    }
}
var customEvent = function () {
    this.listeners = [];
};
customEvent.prototype = {
    addListener:function  (type, listener) {
        this.listeners[type] = listener;
    },
    fireEvent:function (type) {
        if(this.listeners[type]){
            return this.listeners[type].apply(this, arguments);
        }
        return false;
    }
}
//var c =new customEvent();
//c.addListener('a',function(){
//    alert('adfasdf');
//});
//c.fireEvent('a');

