define( function ( require, exports, module ) {
    var svg = require( 'graphic/svg' );
    var utils = require( 'core/utils' );
    var EventHandler = require( 'graphic/eventhandler' );
    var Styled = require( 'graphic/styled' );
    var Data = require( 'graphic/data' );
    var Matrix = require( 'graphic/matrix' );
    var Pen = require( 'graphic/pen' );
    var slice = Array.prototype.slice;

    var Shape = require( 'core/class' ).createClass( 'Shape', {
        mixins: [ EventHandler, Styled, Data ],
        constructor: function ( tagName ) {
            this.node = svg.createNode( tagName );
            this.node.shape = this;
            this.transform = {
                translate: null,
                rotate: null,
                scale: null,
                matrix: null
            };
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
            var box = this.getBoundaryBox();
            var matrix = this.getTransform( refer );
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
        setVisible: function ( value ) {
            if ( value ) {
                this.node.removeAttribute( 'display' );
            } else {
                this.node.setAttribute( 'display', 'none' );
            }
            return this;
        },
        getVisible: function () {
            this.node.getAttribute( 'display' );
        },
        hasAncestor: function ( node ) {
            var parent = this.container;
            while ( parent ) {
                if ( parent === node ) {
                    return true;
                }
                parent = parent.container;
            }
            return false;
        },
        getTransform: function ( refer ) {
            var ctm = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            };
            refer = refer || 'parent';

            if ( refer == 'screen' ) {
                ctm = this.node.getScreenCTM();
            } else if ( refer == 'doc' || refer == 'paper' ) {
                ctm = this.node.getCTM();
            } else if ( refer == 'parent' ) {
                ctm = this.node.getTransformToElement( this.node.parentNode );
            } else if ( ( refer == 'view' || refer == 'top' ) && this.node.getPaper() ) {
                ctm = this.node.getTransformToElement( this.getPaper().shapeNode );
            } else if ( refer.node ) {
                ctm = this.node.getTransformToElement( refer.shapeNode || refer.node );
            }

            return new Matrix( ctm.a, ctm.b, ctm.c, ctm.d, ctm.e, ctm.f );
        },
        clearTransform: function () {
            this.node.removeAttribute( 'transform' );
            this.transform = {
                translate: null,
                rotate: null,
                scale: null,
                matrix: null
            };
            this.trigger( 'shapeupdate', {
                type: 'transform'
            } );
            return this;
        },
        _applyTransform: function () {
            var t = this.transform,
                result = [];
            if ( t.translate ) {
                result.push( [ 'translate(', t.translate, ')' ] );
            }
            if ( t.rotate ) {
                result.push( [ 'rotate(', t.rotate, ')' ] );
            }
            if ( t.scale ) {
                result.push( [ 'scale(', t.scale, ')' ] );
            }
            if ( t.matrix ) {
                result.push( [ 'matrix(', t.matrix, ')' ] );
            }
            this.node.setAttribute( 'transform', utils.flatten( result ).join( ' ' ) );
            return this;
        },
        setMatrix: function () {
            this.transform.matrix = slice.call( arguments );
            return this._applyTransform();
        },
        setTranslate: function () {
            this.transform.translate = slice.call( arguments );
            return this._applyTransform();
        },
        setRotate: function () {
            this.transform.rotate = slice.call( arguments );
            return this._applyTransform();
        },
        setScale: function () {
            this.transform.scale = slice.call( arguments );
            return this._applyTransform();
        },
        translate: function ( dx, dy ) {
            var m = this.transform.matrix || new Matrix();
            if ( dy === undefined ) {
                dy = 0;
            }
            this.transform.matrix = m.translate( dx, dy );
            return this._applyTransform();
        },
        rotate: function ( deg ) {
            var m = this.transform.matrix || new Matrix();
            this.transform.matrix = m.rotate( deg );
            return this._applyTransform();
        },
        scale: function ( sx, sy ) {
            var m = this.transform.matrix || new Matrix();
            if ( sy === undefined ) {
                sy = sx;
            }
            this.transform.matrix = m.scale( sx, sy );
            return this._applyTransform();
        },
        skew: function ( sx, sy ) {
            var m = this.transform.matrix || new Matrix();
            if ( sy === undefined ) {
                sy = sx;
            }
            this.transform.matrix = m.skew( sx, sy );
            return this._applyTransform();
        },
        stroke: function ( pen, width ) {
            if ( pen && pen.stroke ) {
                pen.stroke( this );
            } else {
                // 字符串或重写了 toString 的对象
                this.node.setAttribute( 'stroke', pen.toString() );
                if ( width ) {
                    this.node.setAttribute( 'stroke-width', width );
                }
            }
            return this;
        },
        fill: function ( brush ) {
            // 字符串或重写了 toString 的对象
            this.node.setAttribute( 'fill', brush.toString() );
            return this;
        },
        setAttr: function ( a, v ) {
            var me = this;
            if ( utils.isObject( a ) ) {
                utils.each( a, function ( val, key ) {
                    me.setAttr( key, val );
                } );
            }
            if ( v === undefined || v === null || v === '' ) {
                this.node.removeAttribute( a );
            } else {
                this.node.setAttribute( a, v );
            }
        },
        getAttr: function ( a ) {
            return this.node.getAttribute( a );
        }
    } );

    return Shape;
} );