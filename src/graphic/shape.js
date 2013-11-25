define( function ( require, exports, module ) {
    var svg = require( 'graphic/svg' );
    var utils = require( 'core/utils' );
    var Paper = require( 'graphic/paper' );
    var EventHandler = require( 'graphic/eventhandler' );
    var Styled = require( 'graphic/styled' );
    var Matrix = require( 'graphic/matrix' );
    var Pen = require( 'graphic/pen' );
    var Brush = require( 'graphic/brush' );

    return require( 'core/class' ).createClass( 'Shape', {
        mixins: [ EventHandler, Styled ],
        constructor: function ( tagName ) {
            this.node = svg.createNode( tagName );
            this.node.shape = this;
            this.callMixin();
        },
        getId: function() {
            return this.node.id;
        },
        setId: function(id) {
            this.node.id = id;
            return this;
        },
        getNode: function () {
            return this.node;
        },
        getType: function () {
            throw new Error( "abstract method called" );
        },
        getBoundaryBox: function () {
            var box = this.node.getBBox();
            return box;
        },
        getRenderBox: function () {
            var b = this.getBoundaryBox();
            var xMin = Number.MAX_VALUE,
                xMax = -Number.MAX_VALUE,
                yMin = Number.MAX_VALUE,
                yMax = -Number.MAX_VALUE;
            var bps = [
                [b.x, b.y],
                [b.x + b.width, b.y],
                [b.x, b.y + b.height],
                [b.x + b.width, b.y + b.height]
            ];
            var matrix = this.getTransform().getMatrix();
            var bp, rp;
            while( (bp = bps.pop()) ) {
                rp = Matrix.transformPoint( bp[0], bp[1], matrix );
                xMin = Math.min(xMin, rp.x);
                xMax = Math.max(xMax, rp.x);
                yMin = Math.min(yMin, rp.y);
                yMax = Math.max(yMax, rp.y);
            }
            return {
                x: xMin,
                y: yMin,
                width: xMax - xMin,
                height: yMax - yMin
            };
        },
        getWidth: function () {
            return this.getBoundaryBox().width;
        },
        getHeight: function () {
            return this.getBoundaryBox().height;
        },
        getSize: function () {
            var box = this.getBoundaryBox();
            delete box.x;
            delete box.y;
            return box;
        },
        getTransform: function () {
            return Matrix.parse( this.node.getAttribute( "transform" ) );
        },
        setTransform: function ( matrix ) {
            this.node.setAttribute( "transform", matrix );
            this.trigger('shapeupdate', { type: 'transform'} );
            return this;
        },
        resetTransform: function () {
            this.node.removeAttribute( 'transform' );
            this.trigger('shapeupdate', { type: 'transform'} );
            return this;
        },
        mergeTransform: function ( matrix ) {
            return this.setTransform( this.getTransform().mergeMatrix( matrix ) );
        },
        translate: function ( dx, dy ) {
            if ( dy === undefined ) {
                dy = 0;
            }
            return this.mergeTransform( new Matrix().addTranslate( dx, dy ) );
        },
        rotate: function ( deg, cx, cy ) {
            if(arguments.length === 3) {
                return this.translate(-cx, -cy).rotate(deg).translate(cx, cy);
            }
            return this.mergeTransform( new Matrix().addRotate( deg, cx, cy ) );
        },
        scale: function ( sx, sy, cx, cy ) {
            var args = arguments;
            if (arguments.length > 2 ) {
                args = Array.prototype.slice.call(args);
                cy = args.pop();
                cx = args.pop();
                return this.translate(-cx, -cy).scale.apply(this, args).translate(cx, cy);
            }
            if ( sy === undefined ) {
                sy = sx;
            }
            return this.mergeTransform( new Matrix().addScale( sx, sy ) );
        },
        skew: function ( sx, sy, cx, cy ) {
            var args = arguments;
            if (arguments.length > 2 ) {
                args = Array.prototype.slice.call(args);
                cy = args.pop();
                cx = args.pop();
                return this.translate(-cx, -cy).skew.apply(this, args).translate(cx, cy);
            }
            if ( sy === undefined ) {
                sy = sx;
            }
            return this.mergeTransform( new Matrix().addSkew( sx, sy ) );
        },
        stroke: function ( pen, width ) {
            if ( pen && pen.stroke ) {
                pen.stroke( this );
            } else {
                // 字符串或重写了 toString 的对象
                this.node.setAttribute( 'stroke', pen );
                if(width) {
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
        getPaper: function() {
            var paper = this.container;
            while(paper && !paper.isInstanceOf(Paper)) {
                paper = paper.container;
            }
            return paper;
        },
        getPaperPromise: function(fn) {
            var me = this;
            function loadPaper() {
                var paper = me.getPaper();
                if( !paper ) {
                    return setTimeout(loadPaper, 100);
                }
                fn(paper);
            }
            loadPaper();
        }
    } );
} );