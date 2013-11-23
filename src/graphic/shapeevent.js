/*
 * 图形事件包装类
 * */

define( function ( require, exprots, module ) {

    var Matrix = require( "graphic/matrix" ),
        Utils = require( "core/utils" );

    return require( 'core/class' ).createClass( 'EventHandler', {

        constructor: function ( event ) {

            this.originEvent = event;
            this.targetShape = event.target.shape || event.target.paper;

            if ( event.__kity_param ) {
                Utils.extend( this, event.__kity_param );
            }

        },

        preventDefault: function () {

            var evt = this.originEvent;

            if ( evt.preventDefault ) {

                evt.preventDefault();

                return evt.cancelable;

            } else {

                evt.returnValue = false;

                return true;

            }

        },

        //当前鼠标事件在用户坐标系中点击的点的坐标位置
        getPosition: function () {

            var clientX = this.originEvent.clientX,
                clientY = this.originEvent.clientY,
                paper = this.targetShape.getPaper(),
                //转换过后的点
                transPoint = Matrix.transformPoint( clientX, clientY, paper.node.getScreenCTM().inverse() );

            var zoom = paper.getViewPort().zoom;

            return {
                x: transPoint.x / zoom,
                y: transPoint.y / zoom
            };

        },

        stopPropagation: function () {

            var evt = this.originEvent;

            if ( evt.stopPropagation ) {

                evt.stopPropagation();

            } else {

                evt.cancelBubble = false;

            }

        }

    } );

} );