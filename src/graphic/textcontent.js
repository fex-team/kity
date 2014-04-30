define( function ( require, exports, module ) {
    var Shape = require( 'graphic/shape' );
    return require( 'core/class' ).createClass( 'TextContent', {

        base: Shape,

        constructor: function ( nodeType ) {
            // call shape constructor
            this.callBase( nodeType );
            this.shapeNode = this.shapeNode || this.node;
        },

        clearContent: function () {
            while ( this.shapeNode.firstChild ) {
                this.shapeNode.removeChild( this.shapeNode.firstChild );
            }
            return this;
        },

        setContent: function ( content ) {
            this.shapeNode.textContent = content;
            return this;
        },

        getContent: function () {
            return this.shapeNode.textContent;
        },

        appendContent: function ( content ) {
            this.shapeNode.textContent += content;
            return this;
        },

        setSize: function ( value ) {
            return this.setFontSize( value );
        },

        setFontSize: function ( value ) {
            return this.setFont( {
                size: value
            } );
        },

        setFontFamily: function ( value ) {
            return this.setFont( {
                family: value
            } );
        },

        setFontBold: function ( bold ) {
            return this.setFont( {
                weight: bold ? 'bold' : 'normal'
            } );
        },

        setFontItalic: function ( italic ) {
            return this.setFont( {
                style: italic ? 'italic' : 'normal'
            } );
        },

        setFont: function ( font ) {
            if ( font.family ) {
                this.node.setAttribute( 'font-family', font.family );
            }
            if ( font.size ) {
                this.node.setAttribute( 'font-size', font.size );
            }
            if ( font.weight ) {
                this.node.setAttribute( 'font-weight', font.weight );
            }
            if ( font.style ) {
                this.node.setAttribute( 'font-style', font.style );
            }
            return this;
        },

        getExtentOfChar: function ( index ) {
            return this.node.getExtentOfChar( index );
        },

        getRotationOfChar: function ( index ) {
            return this.node.getRotationOfChar( index );
        },

        getCharNumAtPosition: function ( x, y ) {
            return this.node.getCharNumAtPosition( this.node.viewportElement.createSVGPoint( x, y ) );
        }
    } );
} );