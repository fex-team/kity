var utils = Kity.utils = {
    each : function(obj, iterator, context) {
        if (obj == null) return;
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if(iterator.call(context, obj[i], i, obj) === false)
                    return false;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(iterator.call(context, obj[key], key, obj) === false)
                        return false;
                }
            }
        }
    },
    extend : function (t, s) {
        var a = arguments,
            notCover = this.isBoolean(a[a.length - 1]) ? a[a.length - 1] : false,
            len = this.isBoolean(a[a.length - 1]) ? a.length - 1 : a.length;
        for (var i = 1; i < len; i++) {
            var x = a[i];
            for (var k in x) {
                if (!notCover || !t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    }
};

utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object','Boolean'], function (v) {
    Kity.utils['is' + v] = function (obj) {
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
});