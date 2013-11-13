define( function ( require, exports, module ) {

    var Utils = require( "core/utils" );

    return require( 'core/class' ).createClass( 'Polygon', {

        mixins: [ require( "graphic/container" ) ],
        base: require( "graphic/path" ),

        constructor: function ( points ) {

            this.callBase();
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

            var pathData = [],
                command = null;

            Utils.each( this.getItems(), function ( point, index ) {

                command = index === 0 ? 'M' : 'L';

                pathData.push( command + ' ' + point.x + " " + point.y + " " );

            } );

            if ( pathData.length ) {
                pathData.push( " Z" );
            }

            this.setPathData( pathData.join( "" ) );

            return this;

        }

    } );
} );
