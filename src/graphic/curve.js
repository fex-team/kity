/*
 * 曲线
 * */
define(function(require, exports, module) {

    return require('core/class').createClass( 'Curve', {

        base: require( 'core/path' ),

        constructor: function() {

            this.callBase( 'Curve' );
            this.points = arguments[ 0 ] || [];

        },

        //根据曲线的点集转化为pathData
        _pointToPathData: function () {



        },

        stroke: function ( pen ) {



        }

    });
});