define(function(require, exports, module) {

    var Utils = require('../core/utils'),

        StandardColor = require('./standardcolor'),

        ColorUtils = {},

        Color = require('../core/class').createClass('Color', {

            constructor: function() {

                var colorValue = null;

                //parse构造
                if (typeof arguments[0] === 'string') {

                    colorValue = ColorUtils.parseToValue(arguments[0]);

                    //解析失败
                    if (colorValue === null) {

                        colorValue = {
                            r: 0,
                            g: 0,
                            b: 0,
                            h: 0,
                            s: 0,
                            l: 0,
                            a: 1
                        };

                    }

                } else {

                    colorValue = {
                        r: arguments[0] | 0,
                        g: arguments[1] | 0,
                        b: arguments[2] | 0,
                        //alpha 默认为1
                        a: parseFloat(arguments[3]) || 1
                    };

                    colorValue = ColorUtils.overflowFormat(colorValue);

                    //获取hsl分量
                    colorValue = Utils.extend(colorValue, ColorUtils.rgbValueToHslValue(colorValue));

                }

                this._color = colorValue;

            },

            set: function(name, value) {

                var values = null;

                //设置的值非法
                if (!Color._MAX_VALUE[name]) {
                    throw new Error('Color set(): Illegal parameter');
                }

                if (name !== 'a') {
                    value = Math.floor(value);
                }

                if (name == 'h') {
                    value = (value + 360) % 360;
                }
                this._color[name] = Math.max(Color._MIN_VALUE[name], Math.min(Color._MAX_VALUE[name], value));

                if ('rgb'.indexOf(name) !== -1) {

                    this._color = Utils.extend(this._color, ColorUtils.rgbValueToHslValue(this._color));

                } else if ('hsl'.indexOf(name) !== -1) {
                    this._color = Utils.extend(this._color, ColorUtils.hslValueToRGBValue(this._color));

                }

                return this;

            },

            inc: function(name, value) {

                value = this.get(name) + value;

                if (name == 'h') {
                    value = (value + 360) % 360;
                } else {
                    value = Math.min(Color._MAX_VALUE[name], value);
                    value = Math.max(Color._MIN_VALUE[name], value);
                }

                return this.clone().set(name, value);

            },

            dec: function(name, value) {

                return this.inc(name, -value);

            },

            clone: function() {

                return new Color(this.toRGBA());

            },

            get: function(name) {

                if (!Color._MAX_VALUE[name]) {
                    return null;
                }

                return this._color[name];

            },

            getValues: function() {
                return Utils.clone(this._color);
            },

            valueOf: function() {
                return this.getValues();
            },

            toRGB: function() {
                return ColorUtils.toString(this._color, 'rgb');
            },

            toRGBA: function() {
                return ColorUtils.toString(this._color, 'rgba');
            },

            toHEX: function() {
                return ColorUtils.toString(this._color, 'hex');
            },

            toHSL: function() {
                return ColorUtils.toString(this._color, 'hsl');
            },

            toHSLA: function() {
                return ColorUtils.toString(this._color, 'hsla');
            },

            //默认实现是调用toRGB或者toRGBA
            toString: function() {

                if (this._color.a === 1) {
                    return this.toRGB();
                }

                return this.toRGBA();

            }

        });

    //Color 静态方法
    Utils.extend(Color, {

        //各分量可表示的最大值
        _MAX_VALUE: {
            r: 255,
            g: 255,
            b: 255,
            h: 360,
            s: 100,
            l: 100,
            a: 1
        },

        //各分量最小值
        _MIN_VALUE: {
            r: 0,
            g: 0,
            b: 0,
            h: 0,
            s: 0,
            l: 0,
            a: 0
        },

        //分量常量
        R: 'r',
        G: 'g',
        B: 'b',
        H: 'h',
        S: 's',
        L: 'l',
        A: 'a',

        parse: function(valStr) {

            var rgbValue;

            if (Utils.isString(valStr)) {
                rgbValue = ColorUtils.parseToValue(valStr);
            }

            if (Utils.isObject(valStr) && 'r' in valStr) {
                rgbValue = valStr;
            }

            //解析失败， 返回一个默认color实例
            if (rgbValue === null) {
                return new Color();
            }

            return new Color(rgbValue.r, rgbValue.g, rgbValue.b, rgbValue.a);

        },

        createHSL: function(h, s, l) {
            return Color.createHSLA(h, s, l, 1);
        },

        createHSLA: function(h, s, l, a) {

            var colorValue = null;

            s += '%';
            l += '%';

            colorValue = ['hsla(' + h, s, l, a + ')'];

            return Color.parse(colorValue.join(', '));

        },

        createRGB: function(r, g, b) {
            return Color.createRGBA(r, g, b, 1);
        },

        createRGBA: function(r, g, b, a) {
            return new Color(r, g, b, a);
        }

    });

    //内部工具对象
    Utils.extend(ColorUtils, {

        parseToValue: function(valStr) {

            var rgbaValue = {};

            /* 优先检测在调色板中是否有对应的颜色 */
            valStr = StandardColor.EXTEND_STANDARD[valStr] || StandardColor.COLOR_STANDARD[valStr] || valStr;

            /* 颜色转换 */

            //hex格式
            if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(valStr)) {

                rgbaValue = ColorUtils.hexToValue(valStr);

                //rgb或者rgba格式
            } else if (/^(rgba?)/i.test(valStr)) {

                rgbaValue = ColorUtils.rgbaToValue(valStr);

                //hsl格式
            } else if (/^(hsla?)/i.test(valStr)) {

                rgbaValue = ColorUtils.hslaToValue(valStr);

                //其他格式非法
            } else {

                return null;

            }

            return ColorUtils.overflowFormat(rgbaValue);

        },

        hexToValue: function(hexStr) {

            var result = {},
                keys = ['r', 'g', 'b'];

            if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hexStr)) {

                hexStr = RegExp.$1.split('');

                Utils.each(keys, function(key, index) {

                    if (hexStr.length === 3) {

                        result[key] = ColorUtils.toNumber(hexStr[index] + hexStr[index]);

                    } else {

                        result[key] = ColorUtils.toNumber(hexStr[index * 2] + hexStr[index * 2 + 1]);

                    }

                });

                //转换出hsl值
                result = Utils.extend(result, ColorUtils.rgbValueToHslValue(result));

                result.a = 1;

                return result;

            }

            return null;

        },

        rgbaToValue: function(rgbaStr) {

            var result = {},
                hasAlpha = false,
                keys = ['r', 'g', 'b'];

            if (/^(rgba?)/i.test(rgbaStr)) {

                hasAlpha = RegExp.$1.length === 4;

                rgbaStr = rgbaStr.replace(/^rgba?/i, '').replace(/\s+/g, '').replace(/[^0-9,.]/g, '').split(',');

                Utils.each(keys, function(key, index) {

                    result[key] = rgbaStr[index] | 0;

                });

                //转换出hsl值
                result = Utils.extend(result, ColorUtils.rgbValueToHslValue(result));

                result.a = hasAlpha ? parseFloat(rgbaStr[3]) : 1;

                return result;

            }

            return null;

        },

        hslaToValue: function(hslaStr) {

            var result = {},
                hasAlpha = false;


            if (/^(hsla?)/i.test(hslaStr)) {

                hasAlpha = RegExp.$1.length === 4;

                hslaStr = hslaStr.replace(/^hsla?/i, '').replace(/\s+/g, '').replace(/[^0-9,.]/g, '').split(',');

                //记录hsl值
                result.h = hslaStr[0] | 0;
                result.s = hslaStr[1] | 0;
                result.l = hslaStr[2] | 0;

                //转换出rgb值
                result = Utils.extend(result, ColorUtils.hslValueToRGBValue(result));

                //hsl值转换为rgb值
                result = ColorUtils.hslValueToRGBValue(result);

                result.a = hasAlpha ? parseFloat(hslaStr[3]) : 1;

                return result;

            }

            return null;

        },

        //hsl值对象转换为rgb值对象
        hslValueToRGBValue: function(hslValue) {

            function trans(v1, v2, vH) {

                if (vH < 0) {
                    vH += 1;
                } else if (vH > 1) {
                    vH -= 1;
                }

                if (6 * vH < 1) {
                    return v1 + (v2 - v1) * 6 * vH;
                } else if (2 * vH < 1) {
                    return v2;
                } else if (3 * vH < 2) {
                    return v1 + (v2 - v1) * ((2 / 3 - vH) * 6);
                }

                return v1;
            }

            var q = null,
                p = null,
                result = {};

            hslValue = Utils.extend({}, hslValue);

            hslValue.h = hslValue.h / 360;
            hslValue.s = hslValue.s / 100;
            hslValue.l = hslValue.l / 100;

            //分量计算
            if (hslValue.s === 0) {

                result.r = result.g = result.b = hslValue.l;

            } else {

                if (hslValue.l < 0.5) {

                    q = hslValue.l * (1 + hslValue.s);

                } else {

                    q = hslValue.l + hslValue.s - hslValue.l * hslValue.s;

                }

                p = 2 * hslValue.l - q;

                result.r = trans(p, q, hslValue.h + (1 / 3));
                result.g = trans(p, q, hslValue.h);
                result.b = trans(p, q, hslValue.h - (1 / 3));

            }

            result.r = Math.min(Math.round(result.r * 255), 255);
            result.g = Math.min(Math.round(result.g * 255), 255);
            result.b = Math.min(Math.round(result.b * 255), 255);

            return result;

        },

        //rgb值对象转换为hsl值对象
        rgbValueToHslValue: function(rgbValue) {

            var max = null,
                min = null,
                result = {};

            rgbValue = Utils.extend({}, rgbValue);

            rgbValue.r = rgbValue.r / 255;
            rgbValue.g = rgbValue.g / 255;
            rgbValue.b = rgbValue.b / 255;

            max = Math.max(rgbValue.r, rgbValue.g, rgbValue.b);
            min = Math.min(rgbValue.r, rgbValue.g, rgbValue.b);

            //h分量计算
            if (max === min) {

                result.h = 0;

            } else if (max === rgbValue.r) {

                if (rgbValue.g >= rgbValue.b) {

                    result.h = 60 * (rgbValue.g - rgbValue.b) / (max - min);

                } else {

                    result.h = 60 * (rgbValue.g - rgbValue.b) / (max - min) + 360;

                }

            } else if (max === rgbValue.g) {

                result.h = 60 * (rgbValue.b - rgbValue.r) / (max - min) + 120;

            } else if (max === rgbValue.b) {

                result.h = 60 * (rgbValue.r - rgbValue.g) / (max - min) + 240;

            }

            //l分量计算
            result.l = (max + min) / 2;

            //s分量计算
            if (result.l === 0 || max === min) {

                result.s = 0;

            } else if (result.l > 0 && result.l <= 0.5) {

                result.s = (max - min) / (max + min);

            } else {

                result.s = (max - min) / (2 - max - min);

            }

            //格式化hsl结果

            result.h = Math.round(result.h);
            result.s = Math.round(result.s * 100);
            result.l = Math.round(result.l * 100);

            return result;

        },

        toString: function(colorValue, type) {

            var vals = [];

            colorValue = Utils.extend({}, colorValue);

            if (type.indexOf('hsl') !== -1) {

                colorValue.s += '%';
                colorValue.l += '%';

            }

            if (type !== 'hex') {

                Utils.each(type.split(''), function(key) {

                    vals.push(colorValue[key]);

                });

                return (type + '(' + vals.join(', ') + ')').toLowerCase();

            } else {

                vals.push(ColorUtils.toHexValue(+colorValue.r));
                vals.push(ColorUtils.toHexValue(+colorValue.g));
                vals.push(ColorUtils.toHexValue(+colorValue.b));

                return ('#' + vals.join('')).toLowerCase();

            }

        },

        //16进制的2个数字转化为10进制， 如果转化失败， 返回0
        toNumber: function(value) {
            return Number('0x' + value) | 0;
        },

        toHexValue: function(value) {

            var result = value.toString(16);

            return result.length === 1 ? '0' + result : result;

        },

        //溢出控制
        overflowFormat: function(value) {

            var tmpValue = Utils.extend({}, value),
                keys = 'rgba';

            Utils.each(keys.split(''), function(key) {

                if (!tmpValue.hasOwnProperty(key)) {
                    return;
                }

                //上溢出
                tmpValue[key] = Math.min(Color._MAX_VALUE[key], tmpValue[key]);
                //下溢出
                tmpValue[key] = Math.max(Color._MIN_VALUE[key], tmpValue[key]);

            });

            return tmpValue;

        }

    });

    return Color;

});