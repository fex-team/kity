/*
 * 曲线
 * */
define(function (require, exports, module) {

    var CurveUtil = {

        /*
         * 根据点集合返回曲线pathData
         * @param points 点集合
         * @returns 通过点构成的曲线的pathData
         */
        pointToPathData: function ( points ) {

            switch ( points.length ) {

                case 0:
                    return "";
                case 1:
                    return "M " + points[ 0 ].x + " " + points[ 0 ].y;
                case 2:
                    return "M " + points[ 0 ].x + " " + points[ 0 ].y + " L " + points[ 1 ].x + " " + points[ 1 ].y;
                default:
                    return CurveUtil.getCurvePath( points );

            }

        },

        /*
         * 获取由两个以上的点组成的曲线的pathData
         * @param points 点的集合， 集合中的点的数量必须大于2
         * @return pathData字符串
         */
        getCurvePath: function ( points ) {

            //计算原始点的中点坐标
            var centerPoints = CurveUtil.getCenterPoints( points );

            //注意：计算中点连线的中点坐标， 得出平移线
            centerPoints = CurveUtil.getPanLine( centerPoints );

        },

        /*
         * 计算给定点集合的连线的中点
         * @param points
         */
        getCenterPoints: function ( points ) {

            var centerPoints = {},
                key = null;

            for ( var i = 0, j = 0, len = points.length; i < len; i++ ) {

                //j是下一个点的索引
                j = i === ( len - 1 ) ? 0 : i + 1;

                key = i + "," + j;

                //计算中点坐标
                centerPoints[ key ] = {
                    x: ( points[ i ].x + points[ j ].x ) / 2,
                    y: ( points[ i ].y + points[ j ].y ) / 2
                };


            }

            return centerPoints;

        },

        /*
         * 对getCenterPoints()接口获取到的数据做处理， 计算出各个顶点对应的平移线数据
         * @param points 点集合， 该集合应该是getCenterPoints()接口返回的数据
         */
        getPanLine: function ( points ) {

            var i = 1,
                j = i+ 1,
                result = {};

            while ( points.hasOwnProperty( i + "," + j ) ) {



            }

        }

    };

    return require('core/class').createClass('Curve', {

        base: require('graphic/path'),

        mixins: [ require( "graphic/container" ) ],

        constructor: function () {

            this.callBase();
            this.points = [].slice.call( arguments[0] || [], 0 )

            this.update();

        },

        update: function () {

            var pathData = CurveUtil.pointToPathData( this.points.slice( 0 ) );

            this.setPathData( pathData );

        }

    });



});