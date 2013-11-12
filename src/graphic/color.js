define(function(require, exports, module) {

    var Utils = require('core/utils'),

        StandardColor = require( "graphic/standardcolor" ),

        ColorUtils = {},

        Color = require('core/class').createClass( "Color", {

            constructor: function() {

                var colorValue = null;

                //parse构造
                if ( typeof arguments[ 0 ] === 'string' ) {

                    colorValue = Color.parseToValue( arguments[ 0 ] );

                    //解析失败
                    if ( colorValue === null ) {

                        colorValue = {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1
                        };

                    }

                } else {

                    colorValue = {
                        r: arguments[0] | 0,
                        g: arguments[1] | 0,
                        b: arguments[2] | 0,
                        //alpha 默认为1
                        a: parseFloat( arguments[ 3 ] ) || 1
                    };

                    colorValue = ColorUtils.overflowFormat( colorValue );

                }

                this._color = colorValue;

            },

            set: function ( name, value ) {

                var values = null;

                //设置的值非法
                if ( !Color._MAX_VALUE[ name ] ) {
                    throw new Error( 'Color set(): Illegal parameter' );
                }

                if ( name !== 'a' ) {
                    value = Math.floor( value );
                }

                value = Math.min( Color._MAX_VALUE[name], value );

                //hsl分量
                if ( "hsl".indexOf( name ) !== -1 ) {

                    values = ColorUtils.rgbValueToHSLValue( {
                        r: this._color.r,
                        g: this._color.g,
                        b: this._color.b
                    } );

                    //更新hsl分量
                    values[ name ] = value;

                    //转回rgb
                    values = ColorUtils.hslValueToRGBValue( values );

                    //更新rgb分量
                    Utils.extend( this._color, values );

                    return this;

                }

                this._color[ name ] = Math.max( Color._MIN_VALUE[ name ], Math.min( Color._MAX_VALUE[name], value ) );

                return this;

            },

            increase: function ( name, value ) {

                //设置的值非法
                if ( !Color._MAX_VALUE[ name ] ) {
                    throw new Error( 'Color set(): Illegal parameter' );
                }

                this.set( name, this.get( name ) + value );

                return this;

            },

            decrease: function ( name, value ) {

                return this.increase( name, -value );

            },

            get: function ( name ) {

                if ( !Color._MAX_VALUE[ name ] ) {
                    return null;
                }

                //饱和度
                if ( "hsl".indexOf( name ) !== -1 ) {

                    return ( ColorUtils.rgbValueToHSLValue( {
                        r: this._color.r,
                        g: this._color.g,
                        b: this._color.b
                    } ) )[ name ];

                }

                return this._color[ name ];

            },

            toRGB: function () {
                return ColorUtils.rgbValueToRGBString( this._color );
            },

            toRGBA: function () {
                return ColorUtils.rgbaValueToRGBAString( this._color );
            },

            toHEX: function () {
                return ColorUtils.rgbValueToHEXString( this._color );
            },

            toHSL: function () {
                var hslValue = ColorUtils.rgbValueToHSLValue( this._color );

                return ColorUtils.hslValueToHSLString( hslValue );
            },

            toHSLA: function () {
                var hslValue = ColorUtils.rgbValueToHSLValue( this._color );
                hslValue.a = this._color.a;
                return ColorUtils.hslaValueToHSLAString( hslValue );

            },

            //默认实现是调用toRGBA
            toString: function () {

                if ( this._color.a === 1 ) {
                    return this.toRGB();
                }

                return this.toRGBA();

            }

        } );


    //Color 静态方法
    Utils.extend( Color, {

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

        /*
         * 检测给定的颜色字符串是否是合法的hex格式字符串
         */
        isHex: function ( color ) {

            return /^#([a-f0-9]{3}|[a-f0-9]{6})$/i.test( color );

        },

        parse: function ( valStr ) {

            var rgbValue = Color.parseToValue( valStr );

            return new Color( rgbValue.r, rgbValue.g, rgbValue.b, rgbValue.a );

        },

        parseToValue: function ( valStr ) {

            var rgbValue = {},
                hasAlpha = false,
                keys = [ 'r', 'g', 'b' ];

            //颜色名字字符串->hex格式字符串
            if ( /^[a-z]+$/i.test( valStr ) ) {

                valStr = StandardColor.EXTEND_STANDARD[ valStr ] || StandardColor.COLOR_STANDARD[ valStr ];

                //非标准颜色
                if ( !valStr ) {
                    return null;
                }

            }

            /* 颜色转换 */

            //hex格式
            if ( /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test( valStr ) ) {

                valStr = RegExp.$1.split( "" );

                Utils.each( keys, function ( key, index ) {

                    if ( valStr.length === 3 ) {

                        rgbValue[ key ] = ColorUtils.toNumber( valStr[ index ] + valStr[ index ] );

                    } else {

                        rgbValue[ key ] = ColorUtils.toNumber( valStr[ index*2 ] + valStr[ index*2+1 ] );

                    }

                } );

                rgbValue.a = 1;

                //rgb或者rgba格式
            } else if ( /^(rgba?)/i.test( valStr ) ) {

                hasAlpha = RegExp.$1.length === 4;

                valStr = valStr.replace( /^rgba?/i, '' ).replace( /\s+/g, '').replace( /[^0-9,.]/g, '').split( "," )

                Utils.each( keys, function ( key, index ) {

                    rgbValue[ key ] = valStr[ index ] | 0;

                } );

                rgbValue.a = hasAlpha ? parseFloat( valStr[ 3 ] ) : 1;

                //hsl格式
            } else if ( /^(hsla?)/i.test( valStr ) ) {

                hasAlpha = RegExp.$1.length === 4;

                valStr = valStr.replace( /^hsla?/i, '' ).replace( /\s+/g, '').replace( /[^0-9,.]/g, '').split( "," );

                //记录hsl值
                rgbValue.h = valStr[ 0 ] | 0;
                rgbValue.s = valStr[ 1 ] | 0;
                rgbValue.l = valStr[ 2 ] | 0;

                //hsl值转换为rgb值
                rgbValue = ColorUtils.hslValueToRGBValue( rgbValue );

                rgbValue.a = hasAlpha ? parseFloat( valStr[ 3 ] ) : 1;

                //其他格式非法
            } else {
                return null;
            }

            return ColorUtils.overflowFormat( rgbValue );

        },

        /*
         * 十六进制格式转化为rgb表示
         * 如果传递的字符串不可解析， 则返回null， 否则返回一个PlainObject， 其key包含： r, g, b
         * */
        hexToRGB: function ( hexValue ) {

            var value = Color.hexToRGBValue( hexValue ),
                vals = [];

            if ( value === null ) {
                return null;
            }

            vals = [ value.r, value.g, value.b ];

            return 'rgb('+ vals.join( ", " ) +')';

        },
        hexToRGBValue: function ( hexValue ) {

            var result = {},
                value = [],
                KEY_MAP = [ 'r', 'g', 'b' ];

            if ( /^#/.test( hexValue ) ) {

                if ( /^#([a-f0-9]{3})$/i.test( hexValue ) ) {

                    Utils.each( RegExp.$1.split( "" ), function ( ele, index ) {

                        value[ index*2 ] = ele;
                        value[ index*2 + 1 ] = ele;

                    } );

                } else if ( /^#([a-f0-9]{6})$/i.test( arguments[ 0 ] ) ) {

                    value = RegExp.$1.split( "" );

                } else {

                    return null;

                }

                for ( var i = 0, len = KEY_MAP.length; i < len; i++ ) {

                    result[ KEY_MAP[ i ] ] = ColorUtils.toNumber( value[ i*2 ] + value[ i*2+1 ] );

                }

                return result;

            }

            return null;

        },
        hexToHSL: function ( hexValue ) {

            var value = Color.hexToHSLValue( hexValue );

            return 'hsl('+ value.h +', '+ value.s +'%, '+ value.l +'%)';

        },
        hexToHSLValue: function ( hexValue ) {

            return ColorUtils.rgbValueToHSLValue( Color.hexToRGBValue( hexValue ) );

        }

    } );

    //内部工具对象
    Utils.extend( ColorUtils, {

        //rgb值对象转换为hsl值对象
        rgbValueToHSLValue: function ( rgbValue ) {

            var max = null,
                min = null,
                result = {};

            rgbValue = Utils.extend( {}, rgbValue );

            rgbValue.r = rgbValue.r / 255;
            rgbValue.g = rgbValue.g / 255;
            rgbValue.b = rgbValue.b / 255;

            max = Math.max( rgbValue.r, rgbValue.g, rgbValue.b );
            min = Math.min( rgbValue.r, rgbValue.g, rgbValue.b );

            //h分量计算
            if ( max === min ) {

                result.h = 0;

            } else if ( max === rgbValue.r ) {

                if ( rgbValue.g >= rgbValue.b ) {

                    result.h = 60 * ( rgbValue.g - rgbValue.b ) / ( max - min );

                } else {

                    result.h = 60 * ( rgbValue.g - rgbValue.b ) / ( max - min ) + 360;

                }

            } else if ( max === rgbValue.g ) {

                result.h = 60 * ( rgbValue.b - rgbValue.r ) / ( max - min ) + 120;

            } else if ( max === rgbValue.b ) {

                result.h = 60 * ( rgbValue.r - rgbValue.g ) / ( max - min ) + 240;

            }

            //l分量计算
            result.l = ( max + min ) / 2;

            //s分量计算
            if ( result.l === 0 || max === min ) {

                result.s = 0;

            } else if ( result.l > 0 && result.l <= 0.5 ) {

                result.s = ( max - min ) / ( max + min ) ;

            } else {

                result.s = ( max - min ) / ( 2 - max - min );

            }

            //格式化hsl结果

            result.h = Math.round( result.h );
            result.s = Math.round( result.s * 100 );
            result.l = Math.round( result.l * 100 );

            return result;

        },

        //hsl值对象转换为rgb值对象
        hslValueToRGBValue: function ( hslValue ) {

            var q = null,
                p = null,
                result = {};

            hslValue = Utils.extend( {}, hslValue );

            hslValue.h = hslValue.h / 360;
            hslValue.s = hslValue.s / 100;
            hslValue.l = hslValue.l / 100;

            //分量计算
            if ( hslValue.s === 0 ) {

                result.r = result.g = result.b = hslValue.l;

            } else {

                if ( hslValue.l < 0.5 ) {

                    q = hslValue.l * ( 1 + hslValue.s );

                } else {

                    q = hslValue.l + hslValue.s - hslValue.l * hslValue.s;

                }

                p = 2 * hslValue.l - q;

                result.r = trans( p, q, hslValue.h + ( 1 / 3 ) );
                result.g = trans( p, q, hslValue.h );
                result.b = trans( p, q, hslValue.h - ( 1 / 3 ) );

            }

            result.r = Math.min( Math.round( result.r * 255 ), 255 );
            result.g = Math.min( Math.round( result.g * 255 ), 255 );
            result.b = Math.min( Math.round( result.b * 255 ), 255 );

            return result;

            function trans ( v1, v2, vH ) {

                if ( vH < 0 ) {
                    vH += 1;
                } else if ( vH > 1 ) {
                    vH -= 1;
                }

                if ( 6 * vH < 1 ) {
                    return v1 + ( v2 - v1 ) * 6 * vH;
                } else if ( 2 * vH < 1 ) {
                    return v2;
                } else if ( 3 * vH < 2 ) {
                    return v1 + ( v2 - v1 ) * ( ( 2 / 3 - vH ) * 6 );
                }

                return v1;
            }

        },

        //rgb值对象转换为RGB字符串
        rgbValueToRGBString: function ( rgbValue ) {

            var vals = [ rgbValue.r, rgbValue.g, rgbValue.b ];

            return 'rgb('+ vals.join( ", " ) +')';

        },

        //rgba值对象转换为RGBA字符串
        rgbaValueToRGBAString: function ( rgbaValue ) {

            var vals = [ rgbaValue.r, rgbaValue.g, rgbaValue.b, rgbaValue.a ];

            return 'rgba('+ vals.join( ", " ) +')';

        },

        //rgb值对象转换为HEX字符串
        rgbValueToHEXString: function ( rgbValue ) {

            var res = ( rgbValue.r | 0 ).toString( 16 );

            res += ( rgbValue.g | 0 ).toString( 16 );
            res += ( rgbValue.b | 0 ).toString( 16 );

            return "#" + res.toUpperCase();

        },

        //hsl值对象转换为HSL字符串
        hslValueToHSLString: function ( hslValue ) {

            return 'hsl('+ hslValue.h +', '+ hslValue.s +'%, '+ hslValue.l +'%)';

        },

        hslaValueToHSLAString: function ( hslaValue ) {

            return 'hsla('+ hslaValue.h +', '+ hslaValue.s +'%, '+ hslaValue.l +'%, '+ hslaValue.a +')';

        },

        //16进制的2个数字转化为10进制， 如果转化失败， 返回0
        toNumber: function ( value ) {
            return Number( '0x'+value ) | 0;
        },

        //溢出控制
        overflowFormat: function ( value ) {

            var tmpValue = Utils.extend( {}, value ),
                keys = 'rgba';

            Utils.each( keys.split( "" ), function ( key ) {

                if ( !tmpValue.hasOwnProperty( key ) ) {
                    return;
                }

                //上溢出
                tmpValue[ key ] = Math.min( Color._MAX_VALUE[ key ], tmpValue[ key ] );
                //下溢出
                tmpValue[ key ] = Math.max( Color._MIN_VALUE[ key ], tmpValue[ key ] );

            } );

            return tmpValue;

        }

    } );

    return Color;

});