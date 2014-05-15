define(function() {

    var utils = {
        each: function(obj, iterator, context) {
            if (obj === null) {
                return;
            }
            if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === false) {
                        return false;
                    }
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (iterator.call(context, obj[key], key, obj) === false) {
                            return false;
                        }
                    }
                }
            }
        },
        extend: function(t) {
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
        },

        deepExtend: function(t, s) {
            var a = arguments,
                notCover = this.isBoolean(a[a.length - 1]) ? a[a.length - 1] : false,
                len = this.isBoolean(a[a.length - 1]) ? a.length - 1 : a.length;
            for (var i = 1; i < len; i++) {
                var x = a[i];
                for (var k in x) {
                    if (!notCover || !t.hasOwnProperty(k)) {
                        if (this.isObject(t[k]) && this.isObject(x[k])) {
                            this.deepExtend(t[k], x[k], notCover);
                        } else {
                            t[k] = x[k];
                        }

                    }
                }
            }
            return t;
        },

        clone: function(obj) {
            var cloned = {};
            for (var m in obj) {
                if (obj.hasOwnProperty(m)) {
                    cloned[m] = obj[m];
                }
            }
            return cloned;
        },

        copy: function(obj) {
            if (typeof obj !== 'object') return obj;
            if (typeof obj === 'function') return null;
            return JSON.parse(JSON.stringify(obj));
        },

        queryPath: function(path, obj) {
            var arr = path.split('.');
            var i = 0,
                tmp = obj,
                l = arr.length;
            while (i < l) {
                if (arr[i] in tmp) {
                    tmp = tmp[arr[i]];
                    i++;
                    if (i >= l || tmp === undefined) {
                        return tmp;
                    }
                } else {
                    return undefined;
                }
            }
        },

        getValue: function(value, defaultValue) {

            return value !== undefined ? value : defaultValue;

        },

        flatten: function(arr) {
            var result = [],
                length = arr.length,
                i;
            for (i = 0; i < length; i++) {
                if (arr[i] instanceof Array) {
                    result = result.concat(utils.flatten(arr[i]));
                } else {
                    result.push(arr[i]);
                }
            }
            return result;
        },

        /**
         * 平行地对 v1 和 v2 进行指定的操作
         *
         *    如果 v1 是数字，那么直接进行 op 操作
         *    如果 v1 是对象，那么返回一个对象，其元素是 v1 和 v2 同名的每个元素平行地进行 op 操作的结果
         *    如果 v1 是数组，那么返回一个数组，其元素是 v1 和 v2 同索引的每个元素平行地进行 op 操作的结果
         *
         * @param  {Number|Object|Array} v1
         * @param  {Number|Object|Array} v2
         * @param  {Function} op
         * @return {Number|Object|Array}
         */
        paralle: function(v1, v2, op) {
            var Class, field, index, value;

            // 是否数字
            if (false === isNaN(parseFloat(v1))) {
                return op(v1, v2);
            }

            // 数组
            if (v1 instanceof Array) {
                value = [];
                for (index = 0; index < v1.length; index++) {
                    value.push(utils.paralle(v1[index], v2[index], op));
                }
                return value;
            }

            // 对象
            if (v1 instanceof Object) {
                value = {};

                // 如果值是一个支持原始表示的实例，获取其原始表示
                Class = v1.getClass && v1.getClass();
                if (Class && Class.parse) {
                    v1 = v1.valueOf();
                    v2 = v2.valueOf();
                }

                for (field in v1) {
                    if (v1.hasOwnProperty(field) && v2.hasOwnProperty(field)) {
                        value[field] = utils.paralle(v1[field], v2[field], op);
                    }
                }

                // 如果值是一个支持原始表示的实例，用其原始表示的结果重新封箱
                if (Class && Class.parse) {
                    value = Class.parse(value);
                }

                return value;
            }

            return value;
        },

        /**
         * 创建 op 操作的一个平行化版本
         */
        parallelize: function(op) {
            return function(v1, v2) {
                return utils.paralle(v1, v2, op);
            };
        }
    };

    utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Boolean'], function(v) {
        utils['is' + v] = function(obj) {
            return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
        };
    });

    return utils;
});