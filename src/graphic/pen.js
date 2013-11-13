define( function ( require, exports, module ) {

    var Color = require( "graphic/color" );

    return require( 'core/class' ).createClass( 'Pen', {

        constructor: function ( color, width ) {

            this.color = color || new Color();
            this.width = width || 1;
            this.linecap = null;
            this.linejoin = null;
            this.dashArray = null;
            this.opacity = this.color.get( 'a' );

        },

        getColor: function () {
            return this.color;
        },

        setColor: function ( color ) {

            this.color = color;
            this.opacity = this.color.get( 'a' );

            return this;

        },

        getWidth: function () {

            return this.width;

        },

        setWidth: function ( width ) {

            this.width = width;

            return this;

        },

        getOpacity: function () {

            return this.opacity;

        },

        setOpacity: function ( opacity ) {

            this.opacity = opacity;

        },

        getLineCap: function () {

            return this.linecap;

        },

        setLineCap: function ( linecap ) {

            this.linecap = linecap;

            return this;
        },

        getLineJoin: function () {

            return this.linejoin;
        },

        setLineJoin: function ( linejoin ) {

            this.linejoin = linejoin;

            return this;
        },

        getDashArray: function () {

            return this.dashArray;

        },

        setDashArray: function ( dashArray ) {

            this.dashArray = dashArray;

            return this;

        },

        stroke: function ( shape ) {
            var node = shape.node;
            node.setAttribute( 'stroke', this.getColor() );
            node.setAttribute( 'stroke-width', this.getWidth() );
            if ( this.getOpacity() < 1 ) {
                node.setAttribute( 'stroke-opacity', this.getOpacity() );
            }
            if ( this.getLineCap() ) {
                node.setAttribute( 'stroke-linecap', this.getLineCap() );
            }
            if ( this.getLineJoin() ) {
                node.setAttribute( 'stroke-linejoin', this.getLineJoin() );
            }
            if ( this.getDashArray() ) {
                node.setAttribute( 'stroke-dasharray', this.getDashArray() );
            }
        }

    } );

} );