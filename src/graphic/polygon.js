define( function ( require, exports, module ) {

    var Utils = require( "core/utils" );

    return require( 'core/class' ).createClass( 'Polygon', {

        mixins: [ require( "graphic/container" ) ],
        base: require( "graphic/path" ),

        constructor: function () {

            this.callBase();
            this._children = this.points = [].slice.call( arguments[ 0 ] || [], 0 );
            this.update();

        },

        addItem: function () {

            this.callMixin.apply( this, arguments );

            this.update();

        },

        removeItem: function () {

            this.callMixin.apply( this, arguments );

            this.update();

        },

        update: function () {

            var pathData = [],
                command = null;

            Utils.each( this._children, function ( point, index ) {

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