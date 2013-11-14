/**
 * 通过点来决定图形的公共父类
 */

define( function ( require, exports, module ) {

    var Utils = require("core/utils");

    return require( 'core/class' ).createClass( 'PointShape', {

        base: require( 'graphic/path' ),

        mixins: [ require("graphic/container") ],

        constructor: function ( points, closeable ) {

            this.callBase();

            //是否可闭合
            this.closeable = !!closeable;

            if( Utils.isArray(points)) {
                while(points.length) {
                    this.appendItem(points.shift());
                }
            }

            this.update();

        },

        addItem: function (point, pos) {

            this.callMixin( point, pos );

            this.update();

        },

        removeItem: function (pos) {

            this.callMixin(pos);

            this.update();

        },

        update: function () {

            var drawer = null,
                points = null;

            if ( !this.getItems().length ) {
                return this;
            }

            drawer = this.getDrawer();

            points = this.getItems();

            drawer.clear();

            drawer.moveTo( points[0].x, points[0].y );

            for ( var i = 1, point, len = points.length; i < len; i++ ) {

                point = points[ i ];

                drawer.lineTo( point.x, point.y );

            }

            if ( this.closeable && points.length > 2 ) {
                drawer.close();
            }

            return this;

        }

    } );

} );
