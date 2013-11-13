/*
 * 曲线
 * */
define(function (require, exports, module) {

    var Utils = require( "core/utils" ),
        CurveUtil = {

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
            var centerPoints = CurveUtil.getCenterPoints( points),

                //注意：计算中点连线的中点坐标， 得出平移线
                panLines = CurveUtil.getPanLine( points.length, centerPoints ),

                pathData = [];

            //获取平移线移动到顶点后的位置
            panLines = CurveUtil.getMovedPanLines( points, panLines );

            pathData.push( 'M ' + points[ 0 ].x + " " + points[ 0 ].y );

            for ( var i = 0, len = points.length - 1; i < len ; i++ ) {

                pathData.push( ' C ' + panLines[ i ].points[ 1 ].x + " " + panLines[ i ].points[ 1 ].y + ", ");
                pathData.push( panLines[ i + 1 ].points[ 0 ].x + " " + panLines[ i + 1 ].points[ 0 ].y + ", " );
                pathData.push( points[ i + 1 ].x + " " + points[ i + 1 ].y );

            }

            //如果是闭合状态， 则进行闭合处理
            if ( this.close ) {

                pathData.push( ' C ' + panLines[ i ].points[ 1 ].x + " " + panLines[ i ].points[ 1 ].y + ", ");
                pathData.push( panLines[ i + 1 ].points[ 0 ].x + " " + panLines[ i + 1 ].points[ 0 ].y + ", " );
                pathData.push( points[ i + 1 ].x + " " + points[ i + 1 ].y );

            }

            return pathData.join( "" );


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
         * @param length 集合中点的个数
         * @param points 点集合， 该集合应该是getCenterPoints()接口返回的数据
         */
        getPanLine: function ( length, points ) {

            var result = {},
                //顶点索引
                pointIndex = null;

            for ( var i = 0 , j; i < length; i++ ) {

                var point1 = null,
                    point2 = null;

                //计算当前点

                j = ( i + 1 ) % length;

                //保存当前处理的顶点索引
                pointIndex = j;

                point1 = points[ i + "," + j ];

                //计算下一个点
                i = j;
                j = ( i + 1 ) % length;

                point2 = points[ i + "," + j ];

                result[ pointIndex ] = {
                    points: [ {
                        x: point1.x,
                        y: point1.y
                    }, {
                        x: point2.x,
                        y: point2.y
                    } ],

                    center: {
                        x: ( point1.x + point2.x ) / 2,
                        y: ( point1.y + point2.y ) / 2
                    }
                }

                //还原i值
                i = ( pointIndex + length - 1 ) % length;

            }

            return result;

        },

        /*
         * 计算平移线移动到顶点后的位置
         * @param points 顶点集合
         * @param panLines 平移线集合
         */
        getMovedPanLines: function ( points, panLines ) {

            var result = {};

            Utils.each( points, function ( point, index ) {

                    //当前平移线
                var currentPanLine = panLines[ index ],
                    //平移线中点
                    center = currentPanLine.center,

                    //移动距离
                    distance = {
                        x: center.x - point.x,
                        y: center.y - point.y
                    };

                var currentResult = result[ index ] = {
                    points: [],
                    center: {
                        x: point.x,
                        y: point.y
                    }
                };

                Utils.each( currentPanLine.points, function ( controlPoint, index ) {

                    currentResult.points.push( {
                        x: controlPoint.x - distance.x,
                        y: controlPoint.y - distance.y
                    } );

                } );

            } );

            return result;

        }

    };

    return require('core/class').createClass('Curve', {

        base: require('graphic/path'),

        mixins: [ require( "graphic/container" ) ],

        constructor: function () {

            this.callBase();
            this.points = [].slice.call( arguments[0] || [], 0 );
            //闭合状态
            this.close = false;

            this.update();

        },

        update: function () {

            var pathData = CurveUtil.pointToPathData( this.points.slice( 0 ) );

            this.setPathData( pathData );

            return this;

        },

        close: function () {

            this.close = true;

            return this.update();

        },

        isClose: function () {

            return this.close || false;

        }

    });



});