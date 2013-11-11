define(function(require, exports, module) {

    var Utils = require( "core/utils" ),
        Parent = require( "graphic/parent" );

    return require('core/class').createClass( 'Polyline', {

        base: require( 'graphic/path' ),

        mixins: [ Parent ],

        constructor: function () {

            this.callBase();
            this._children = [].slice.call( arguments, 0 );

        },

        update: function () {

            var pathData = [],
                command = null;

            Utils.each( this._children, function ( point, index ) {

                command = index === 0 ? 'M' : 'L';

                pathData.push( command + ' ' + point.x + ' ' + point.y );

            } );

            this.setPathData( pathData.join( ", " ) );

        },

        addChild: function () {

            this.callMixin.apply( this, arguments );

            this.update();

        },

        removeChild: function () {

            this.callMixin.apply( this, arguments );

            this.update();

        }

    });
});