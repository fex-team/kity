/**
 * 贝塞尔曲线
 */

define(function(require, exports, module) {

    return require('core/class').createClass('Bezier', {

        mixins: [require('graphic/pointcontainer')],

        base: require('graphic/path'),

        constructor: function(bezierPoints) {

            this.callBase();

            bezierPoints = bezierPoints || [];

            this.changeable = true;
            this.setBezierPoints(bezierPoints);

        },

        getBezierPoints: function() {
            return this.getPoints();
        },

        setBezierPoints: function(bezierPoints) {
            return this.setPoints(bezierPoints);
        },

        //当点集合发生变化时采取的动作
        onContainerChanged: function() {

            if (this.changeable) {
                this.update();
            }

        },

        update: function() {

            var drawer = null,
                bezierPoints = this.getBezierPoints();

            //单独的一个点不画任何图形
            if (bezierPoints.length < 2) {
                return;
            }

            drawer = this.getDrawer();

            drawer.clear();

            var vertex = bezierPoints[0].getVertex(),
                forward = null,
                backward = null;

            drawer.moveTo(vertex.x, vertex.y);

            for (var i = 1, len = bezierPoints.length; i < len; i++) {

                vertex = bezierPoints[i].getVertex();
                backward = bezierPoints[i].getBackward();
                forward = bezierPoints[i - 1].getForward();

                drawer.bezierTo(forward.x, forward.y, backward.x, backward.y, vertex.x, vertex.y);

            }

            return this;

        }

    });

});