define(function (require, exports, module) {

    var Utils = require("core/utils");

    return require('core/class').createClass('Polyline', {

        base: require('graphic/path'),

        mixins: [ require("graphic/pointcontainer") ],

        constructor: function () {

            this.callBase();
            this._children = this.points = [].slice.call(arguments[0] || [], 0);
            this.update();

        },

        update: function () {

            var pathData = [],
                command = null;

            Utils.each(this._children, function (point, index) {

                command = index === 0 ? 'M' : 'L';

                pathData.push( command + ' ' + point.x + ' ' + point.y + " " );

            });

            this.setPathData(pathData.join(""));

            return this;

        },

        addPoint: function () {

            this.callMixin.apply(this, arguments);

            this.update();

        },

        removePoint: function () {

            this.callMixin.apply(this, arguments);

            this.update();

        }

    });
});