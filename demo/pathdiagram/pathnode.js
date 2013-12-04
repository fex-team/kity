define( function ( require, exports, module ) {
    var Group = require( 'graphic/group' );
    var Rect = require( 'graphic/rect' );
    var Text = require( 'graphic/text' );
    var TextSpan = require( 'graphic/textspan' );
    var colors = require( './colors' );

    return require( 'core/class' ).createClass( {
        base: Group,
        constructor: function ( x, y, width, height, data ) {
            this.callBase();
            this.data = data;
            this.rect = new Rect( x, y, width, height, 5 );
            this.text = new Text().pipe( function () {
                this.setSize( 14 );
                this.setX( x + width / 2 );
                this.setY( y + height / 2 + 6 );
                this.setAnchor( 'middle' );
                this.addSpan( new TextSpan( data.word + ' | ' ).fill( colors.get( 'text' ) ) );
                this.addSpan( new TextSpan( data.uv ).fill( colors.get( 'text-uv' ) ) );
            } );
            this.addShape( this.rect );
            this.addShape( this.text );
            this.unselect();
            this.setStyle( 'cursor', 'pointer' );
        },
        unselect: function () {
            this.rect.fill( colors.get( 'node-fill' ) );
            this.rect.stroke( colors.get( 'node-stroke' ) );
        },
        select: function () {
            this.rect.fill( colors.get( 'node-fill-active' ) );
            this.rect.stroke( colors.get( 'node-stroke-active' ) );
        }
    } );
} );