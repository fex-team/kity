/*
 * 图形事件包装类
 * */

define( function ( require, exprots, module ) {

    return require( 'core/class' ).createClass( 'EventHandler', {

        constructor: function ( event ) {

            this.originEvent = event;
            this.targetShape = event.target.shape || event.target.paper;

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