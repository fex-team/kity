define( function ( require, exports, module ) {

    var TextContent = require( 'graphic/textcontent' );
    var ShapeContainer = require( 'graphic/shapecontainer' );
    var svg = require( 'graphic/svg' );

    return require( 'core/class' ).createClass( 'Text', {
        base: TextContent,

        mixins: [ ShapeContainer ],

        constructor: function ( content ) {
            this.callBase( 'text' );
            if ( content !== undefined ) {
                this.setContent( content );
            }
        },

        setX: function ( x ) {
            this.node.setAttribute( 'x', x );
            return this;
        },

        setY: function ( y ) {
            this.node.setAttribute( 'y', y );
            return this;
        },

        getX: function () {
            return +this.node.getAttribute( 'x' );
        },

        getY: function () {
            return +this.node.getAttribute( 'y' );
        },

        setAnchor: function( anchor ) {
            this.node.setAttribute('text-anchor', anchor);

            // text path
            if(this.shapeNode != this.node) {
                this.shapeNode.setAttribute('startOffset', {
                    'start': '0',
                    'middle': '50%',
                    'end': '100%'
                }[anchor]);
            }
        },

        getAnchor: function() {
            return this.node.getAttribute('text-anchor') || 'start';
        },

        addSpan: function(span) {
            this.addShape(span);
        },

        setPath: function ( path ) {
            var textpath = this.shapeNode;
            if ( this.shapeNode == this.node ) {
                // 当前还不是 textpath
                textpath = this.shapeNode = svg.createNode( 'textPath' );
                while ( this.node.firstChild ) {
                    this.shapeNode.appendChild( this.node.firstChild );
                }
                this.node.appendChild( textpath );
            }
            textpath.setAttributeNS( svg.xlink, "xlink:href", '#' + path.node.id );
            return this;
        }
    } );
} );