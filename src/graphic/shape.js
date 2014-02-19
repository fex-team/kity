define( function ( require, exports, module ) {
    var svg = require( 'graphic/svg' );
    var utils = require( 'core/utils' );
    var EventHandler = require( 'graphic/eventhandler' );
    var Styled = require( 'graphic/styled' );
    var Data = require( 'graphic/data' );
    var Matrix = require( 'graphic/matrix' );
    var Pen = require( 'graphic/pen' );

    return require( 'core/class' ).createClass( 'Shape', {
        mixins: [ EventHandler, Styled, Data ],
        constructor: function ( tagName ) {
            this.node = svg.createNode( tagName );
            this.node.shape = this;
            this.callMixin();
        },
        getId: function () {
            return this.node.id;
        },
        setId: function ( id ) {
            this.node.id = id;
            return this;
        },
        getNode: function () {
            return this.node;
        },
        getBoundaryBox: function () {
            var box;
            try {
                box = this.node.getBBox();
            } catch ( e ) {
                box = {
                    x: this.node.clientLeft,
                    y: this.node.clientTop,
                    width: this.node.clientWidth,
                    height: this.node.clientHeight
                };
            }
            return box;
        },
        getRenderBox: function ( refer ) {
            function isAncestorOf( container, shape ) {
                var parent = shape.container;
                while ( parent && parent != container ) {
                    parent = parent.container;
                }
                return !!parent;
            }
            if ( refer === undefined ) {
                refer = this;
            } else if ( refer === 'top' || refer === 'paper' ) {
                refer = this.getPaper() || this;
            } else if ( !isAncestorOf( refer, this ) ) {
                refer = this;
            }
            var box = this.getBoundaryBox();
            var current = this;
            var matrix = current.getTransform();
            while ( current != refer ) {
                current = current.container;
                matrix = matrix.merge( current.getTransform() );
            }
            return matrix.transformBox( box );
        },
        getWidth: function () {
            return this.getRenderBox().width;
        },
        getHeight: function () {
            return this.getRenderBox().height;
        },
        getSize: function () {
            var box = this.getRenderBox();
            delete box.x;
            delete box.y;
            return box;
        },
        setOpacity: function ( value ) {
            this.node.setAttribute( 'opacity', value );
            return this;
        },
        getOpacity: function () {
            var opacity = this.node.getAttribute( 'opacity' );
            return opacity ? +opacity : 1;
        },
        getTransform: function () {
            return Matrix.parse( this.node.getAttribute( "transform" ) );
        },
        setTransform: function ( matrix ) {
            this.node.setAttribute( "transform", matrix );
            this.trigger( 'shapeupdate', {
                type: 'transform'
            } );
            return this;
        },
        resetTransform: function () {
            this.node.removeAttribute( 'transform' );
            this.trigger( 'shapeupdate', {
                type: 'transform'
            } );
            return this;
        },
        mergeTransform: function ( matrix ) {
            return this.setTransform( this.getTransform().mergeMatrix( matrix ) );
        },
        getAnchor: function () {
            if ( this.anchor && this.anchor.x !== undefined ) {
                return this.anchor;
            }
            var anchor = anchor || 'center';
            var rbox = this.getRenderBox();
            var value = {
                x: rbox.x + rbox.width / 2,
                y: rbox.y + rbox.height / 2
            };
            if ( ~anchor.indexOf( 'left' ) ) {
                value.x = rbox.x;
            }
            if ( ~anchor.indexOf( 'right' ) ) {
                value.x = rbox.x + rbox.width;
            }
            if ( ~anchor.indexOf( 'top' ) ) {
                value.y = rbox.y;
            }
            if ( ~anchor.indexOf( 'bottom' ) ) {
                value.y = rbox.y + rbox.height;
            }
            return value;
        },
        setAnchor: function ( ax, ay ) {
            if ( arguments.length === 1 ) {
                this.anchor = ax;
            } else {
                this.anchor = {
                    x: ax,
                    y: ay
                };
            }
            return this;
        },
        resetAnchor: function () {
            delete this.anchor;
            return this;
        },
        translate: function ( dx, dy ) {
            if ( dy === undefined ) {
                dy = 0;
            }
            return this.mergeTransform( new Matrix().translate( dx, dy ) );
        },
        rotate: function ( deg ) {
            var a = this.getAnchor();
            return this.mergeTransform( new Matrix().translate( -a.x, -a.y ).rotate( deg ).translate( a.x, a.y ) );
        },
        scale: function ( sx, sy ) {
            var a = this.getAnchor();
            if ( sy === undefined ) {
                sy = sx;
            }
            return this.mergeTransform( new Matrix().translate( -a.x, -a.y ).scale( sx, sy ).translate( a.x, a.y ) );
        },
        skew: function ( sx, sy ) {
            var a = this.getAnchor();
            if ( sy === undefined ) {
                sy = sx;
            }
            return this.mergeTransform( new Matrix().translate( -a.x, -a.y ).skew( sx, sy ).translate( a.x, a.y ) );
        },
        stroke: function ( pen, width ) {
            if ( pen && pen.stroke ) {
                pen.stroke( this );
            } else {
                // 字符串或重写了 toString 的对象
                this.node.setAttribute( 'stroke', pen );
                if ( width ) {
                    this.node.setAttribute( 'stroke-width', width );
                }
            }
            return this;
        },
        fill: function ( brush ) {
            if ( brush && brush.fill ) {
                brush.fill( this );
            } else {
                // 字符串或重写了 toString 的对象
                this.node.setAttribute( 'fill', brush );
            }
            return this;
        },
        setAttr: function ( a, v ) {
            var me = this;
            if ( utils.isObject( a ) ) {
                utils.each( a, function ( val, key ) {
                    me.setAttr( key, val )
                } )
            }
            if ( v === undefined || v === null || v === '' ) {
                this.node.removeAttribute( a );
            } else {
                this.node.setAttribute( a, v );
            }
        },
        getAttr: function ( a ) {
            return this.node.getAttribute( a )
        }
    } );
} );