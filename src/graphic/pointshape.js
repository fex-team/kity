/**
 * 通过点来决定图形的公共父类
 */

define( function ( require, exports, module ) {

    var Utils = require("core/utils");

    return require( 'core/class' ).createClass( 'PointShape', {

        base: require( 'graphic/path' ),

        mixins: [ require("graphic/pointcontainer") ],

        constructor: function ( points, closeable ) {

            this.callBase();

            //是否可闭合
            this.closeable = !!closeable;

            this.setPoints( points );

            this.changeable = true;
            this.update();

        },

        //当点集合发生变化时采取的动作
        onContainerChanged: function () {

            if ( this.changeable ) {
                this.update();
            }

        },

        update: function () {

            var drawer = this.getDrawer(),
                points = this.getItems();

            drawer.clear();

            if ( !points.length ) {
                return this;
            }

            drawer.moveTo( points[0].getX(), points[0].getY() );

            for ( var i = 1, point, len = points.length; i < len; i++ ) {

                point = points[ i ];

                drawer.lineTo( point.getX(), point.getY() );

            }

            if ( this.closeable && points.length > 2 ) {
                drawer.close();
            }

            return this;

        }

    } );

} );
