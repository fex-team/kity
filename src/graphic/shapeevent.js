/*
 * 图形事件包装类
 * */

define( function ( rquire, exprots, module ) {

    return require('core/class').createClass( 'EventHandler', {

        constructor: function ( shape, event ) {

            this.originEvent = event;
            this.targetShape = shape;

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