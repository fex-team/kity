define(function(require, exports, module) {

    var RectUtils = {},
        Utils = require('core/utils'),
        Point = require('graphic/point'),
        Box = require('graphic/box');

    Utils.extend(RectUtils, {

        //根据传递进来的width、height和radius属性，
        //获取最适合的radius值
        formatRadius: function(width, height, radius) {

            var minValue = Math.floor(Math.min(width / 2, height / 2));

            return Math.min(minValue, radius);

        }

    });

    var Rect = require('core/class').createClass('Rect', {

        base: require('graphic/path'),

        constructor: function(width, height, x, y, radius) {

            this.callBase();

            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
            this.radius = RectUtils.formatRadius(this.width, this.height, radius || 0);

            this.update();

        },

        update: function() {
            var x = this.x,
                y = this.y,
                w = this.width,
                h = this.height,
                r = this.radius;
            var drawer = this.getDrawer().redraw();

            if (!r) {

                // 直角
                drawer.push('M', x, y);
                drawer.push('h', w);
                drawer.push('v', h);
                drawer.push('h', -w);
                drawer.push('z');

            } else {

                //圆角
                w -= 2 * r;
                h -= 2 * r;

                drawer.push('M', x + r, y);
                drawer.push('h', w);
                drawer.push('a', r, r, 0, 0, 1, r, r);
                drawer.push('v', h);
                drawer.push('a', r, r, 0, 0, 1, -r, r);
                drawer.push('h', -w);
                drawer.push('a', r, r, 0, 0, 1, -r, -r);
                drawer.push('v', -h);
                drawer.push('a', r, r, 0, 0, 1, r, -r);
                drawer.push('z');

            }

            drawer.done();

            return this;

        },

        setWidth: function(width) {
            this.width = width;

            return this.update();
        },

        setHeight: function(height) {
            this.height = height;

            return this.update();
        },

        setSize: function(width, height) {
            this.width = width;
            this.height = height;

            return this.update();
        },

        setBox: function(box) {
            this.x = box.x;
            this.y = box.y;
            this.width = box.width;
            this.height = box.height;

            return this.update();
        },

        getBox: function() {
            return new Box(this.x, this.y, this.width, this.height);
        },

        getRadius: function() {
            return this.radius;
        },

        setRadius: function(radius) {
            this.radius = radius;
            return this.update();
        },

        getPosition: function() {
            return new Point(
                this.x,
                this.y
            );
        },

        setPosition: function(x, y) {
            if (arguments.length == 1) {
                var p = Point.parse(arguments[0]);
                y = p.y;
                x = p.x;
            }
            this.x = x;
            this.y = y;

            return this.update();
        },

        getWidth: function() {
            return this.width;
        },

        getHeight: function() {
            return this.height;
        },

        getPositionX: function() {
            return this.x;
        },

        getPositionY: function() {
            return this.y;
        },

        setPositionX: function(x) {
            this.x = x;
            return this.update();
        },

        setPositionY: function(y) {
            this.y = y;
            return this.update();
        }

    });

    var ShapeContainer = require('graphic/shapecontainer');

    ShapeContainer.creators.rect = Rect;

    return Rect;

});