define(function(require, exports, module) {

    var RectUtils = {},
        Utils = require( 'core/utils' );

    Utils.extend( RectUtils, {

        //根据传递进来的width、height和radius属性，
        //获取最适合的radius值
        formatRadius: function ( width, height, radius ) {

            var minValue = Math.floor( Math.min( width/2, height/2 ) );

            return Math.min( minValue, radius );

        },


        getPathData: function ( x, y, width, height, radius ) {

            var pathData = null;

            //直角
            if ( radius === 0 ) {

                pathData = [
                    'M ' + x + ',' + y,
                    ' h ' + width,
                    ' v ' + height,
                    ' h ' + ( -width ),
                    ' Z'
                ];

                //圆角
            } else {

                width -= 2 * radius;
                height -= 2 * radius;

                pathData = [

                    'M ' + ( x + radius ) + ',' + y,
                    ' h ' + width,
                    ' a ' + radius + ' ' + radius + ' 0 0 1 ' + radius + ' ' + radius,
                    ' v ' + height,
                    ' a ' + radius + ' ' + radius + ' 0 0 1 ' + ( -radius ) + ' ' + radius,
                    ' h ' + ( -width ),
                    ' a ' + radius + ' ' + radius + ' 0 0 1 ' + ( -radius ) + ' ' + ( -radius ),
                    ' v ' + ( -height ),
                    ' a ' + radius + ' ' + radius + ' 0 0 1 ' + radius + ' ' + ( -radius ),
                    ' Z'
                ];

            }


            return pathData.join( "" );

        }

    } );

    return require('core/class').createClass( 'Rect', {

        base: require( 'graphic/path' ),

        constructor: function( x, y, width, height, radius ) {

            this.callBase();

            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
            this.radius = RectUtils.formatRadius( this.width, this.height, radius || 0 );

            this.update();

        },

        update: function () {

            var pathData = RectUtils.getPathData( this.x, this.y, this.width, this.height, this.radius );

            this.setPathData( pathData );

            return this;

        },

        setWidth: function ( width ) {
            this.width = width;

            return this.update();
        },

        setHeight: function ( height ) {
            this.height = height;

            return this.update();
        },

        setSize: function ( width, height ) {
            this.width = width;
            this.height = height;

            return this.update();
        },

        getRadius: function () {
            return this.radius;
        },

        setRadius: function ( radius ) {
            this.radius = radius;
            return this.update();
        },

        getPosition: function () {
            return {
                x: this.x,
                y: this.y
            };
        },

        setPosition: function ( x, y ) {
            this.x = x;
            this.y = y;

            return this.update();
        },

        getWidth: function () {
            return this.width;
        },

        getHeight: function () {
            return this.height;
        },

        getPositionX: function () {
            return this.x;
        },

        getPositionY: function () {
            return this.y;
        },

        setPositionX: function ( x ) {
            this.x = x;
            return this.update();
        },

        setPositionY: function ( y ) {
            this.y = y;
            return this.update();
        }

    });



});