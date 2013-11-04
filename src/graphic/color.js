define(function(require, exports, module) {

    var utils = require('core/utils'),

        ColorUtils = {},

        Color = require('core/class').createClass( "Color", {

            constructor: function() {

                var colorValue = arguments,
                    tmp = null;

                this._init();

                //16进制表示形式转化为rgba表示
                if ( /^#/.test( arguments[ 0 ] ) ) {

                    colorValue = Color.hexToRGBValue( arguments[0] );

                    if ( colorValue === null ) {
                        throw new Error( 'Color: Syntax Error' );
                    }

                    tmp = colorValue;
                    colorValue = [];

                    colorValue.push( tmp.r );
                    colorValue.push( tmp.g );
                    colorValue.push( tmp.b );
                    colorValue.push( 1 );

                }

                this._color = {
                    r: Math.min( this._MAX_VALUE.r, Math.floor( colorValue[ 0 ] ) ) | 0,
                    g: Math.min( this._MAX_VALUE.g, Math.floor( colorValue[ 1 ] ) ) | 0,
                    b: Math.min( this._MAX_VALUE.b, Math.floor( colorValue[ 2 ] ) ) | 0,
                    a: Math.min( this._MAX_VALUE.a, colorValue[ 3 ] ) | 0
                };

            },

            _init: function () {

                //各分量可表示的最大值
                this._MAX_VALUE = {
                    r: 255,
                    g: 255,
                    b: 255,
                    h: 360,
                    s: 100,
                    l: 100,
                    a: 1
                };

            },

            set: function ( name, value ) {

                var values = null;

                //设置的值非法
                if ( !this._MAX_VALUE[ name ] ) {
                    throw new Error( 'Color set(): Illegal parameter' );
                }

                if ( name !== 'a' ) {
                    value = Math.floor( value );
                }

                value = Math.min( this._MAX_VALUE[name], value );

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

                    console.log(values)
                    //更新rgb分量
                    utils.extend( this._color, values );

                    return this;

                }

                this._color[ name ] = Math.min( this._MAX_VALUE[name], value );

                return this;

            },

            increase: function ( name, value ) {

                //设置的值非法
                if ( !this._MAX_VALUE[ name ] ) {
                    throw new Error( 'Color set(): Illegal parameter' );
                }

                this.set( name, this.get( name ) + value );

                return this;

            },

            decrease: function ( name, value ) {

                return this.increase( name, -value );

            },

            get: function ( name ) {

                if ( !this._MAX_VALUE[ name ] ) {
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

                return this.toRGBA();

            }

        } );


    //Color 静态方法
    utils.extend( Color, {

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

                if ( /^#([a-f0-9]{3})$/.test( hexValue ) ) {

                    utils.each( RegExp.$1.split( "" ), function ( ele, index ) {

                        value[ index*2 ] = ele;
                        value[ index*2 + 1 ] = ele;

                    } );

                } else if ( /^#([a-f0-9]{6})$/.test( arguments[ 0 ] ) ) {

                    value = RegExp.$1.split( "" );

                } else {

                    return null;

                }

                for ( var i = 0, len = KEY_MAP.length; i < len; i++ ) {

                    result[ KEY_MAP[ i ] ] = parseInt( value[ i*2 ] + value[ i*2+1 ], 16 );

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
    utils.extend( ColorUtils, {

        //rgb值对象转换为hsl值对象
        rgbValueToHSLValue: function ( rgbValue ) {

            var max = null,
                min = null,
                result = {};

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

        }

    } );

    return Color;

});