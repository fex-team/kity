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
		},

		setContent: function ( content ) {
			this.shapeNode.textContent = content;
		},

		getContent: function () {
			return this.shapeNode.textContent;
		},

		appendContent: function ( content ) {
			this.shapeNode.textContent += content;
		}
	} );
} );