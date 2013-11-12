define(function(require, exports, module) {

    var Utils = require( "core/utils" ),
        Parent = require( "graphic/parent" );

    return require('core/class').createClass( 'Polyline', {

        base: require( 'graphic/path' ),

        mixins: [ Parent ],

        constructor: function () {

            this.callBase();
            this._children = this.points = [].slice.call( arguments[0] || [], 0 );
            this.update();

        },

        update: function () {

            var pathData = [],
                command = null;

            Utils.each( this._children, function ( point, index ) {

                command = index === 0 ? 'M' : 'L';

                pathData.push( command + ' ' + point.x + ',' + point.y + " " );

            } );

            this.setPathData( pathData.join( "" ) );

            return this;

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