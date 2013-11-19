/**
 * 贝塞尔曲线
 */

define( function ( require, exports, module ) {

    var Utils = require( "core/utils" );

    return require( "core/class" ).createClass( 'Bezier', {

        mixins: [ require( "graphic/pointcontainer" ) ],

        base: require( "graphic/path" ),

        constructor: function ( points ) {

            this.callBase();

            points = points || [];

            this.changeable = true;
            this.setPoints( points );

        },

        //当点集合发生变化时采取的动作
        onContainerChanged: function () {

            if ( this.changeable ) {
                this.update();
            }

        },

        update: function () {


            var drawer = null,
                points = this.getPoints();

            //单独的一个点不画任何图形
            if ( points.length < 2 ) {
                return;
            }

            drawer = this.getDrawer();

            //重绘需要clear掉
            drawer.clear();

            if ( !points.length ) {
                return this;
            }
            var vertix, forward, backward;

            vertix = points[0].getPoint();
            drawer.moveTo( vertix.x, vertix.y );

            for ( var i = 1, len = points.length - 1; i <= len; i++ ) {

                vertix = points[ i ].getPoint();
                backward = points[ i ].getBackward();
                forward = points[ i - 1 ].getForward();

                drawer.bezierTo( forward.x, forward.y, backward.x, backward.y, vertix.x, vertix.y );

            }

            return this;

        }

    } );

} );
