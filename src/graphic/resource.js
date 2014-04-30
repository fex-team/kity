define( function ( require, exports, module ) {
    var svg = require( 'graphic/svg' );
    return require( 'core/class' ).createClass( 'Resource', {
        constructor: function ( nodeType ) {
            this.callBase();
            this.node = svg.createNode( nodeType );
        },
        toString: function() {
            return 'url(#' + this.node.id + ')';
        }
    } );
} );