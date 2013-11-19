/**
 * 贝塞尔曲线
 */

define( function ( require, exports, module ) {

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

            drawer.clear();

            drawer.moveTo( points[ 0 ].getPoint().x, points[ 0 ].getPoint().y );

            for ( var i = 1, point, forward, backward, len = points.length - 1; i <= len; i++ ) {

                point = points[ i ].getPoint();
                backward = points[ i ].getBackward();
                forward = points[ i - 1 ].getForward();

                drawer.bezierTo( forward.x, forward.y, backward.x, backward.y, point.x, point.y );

            }

            return this;

        }

    } );

} );
