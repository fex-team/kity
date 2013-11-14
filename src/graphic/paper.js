define( function ( require, exports, module ) {
    var createClass = require( 'core/class' ).createClass;
    var utils = require( 'core/utils' );
    var svg = require( 'graphic/svg' );
    var Container = require( 'graphic/container' );
    var ShapeContainer = require( 'graphic/shapecontainer' );
    var EventHandler = require( 'graphic/eventhandler' );
    return createClass( 'Paper', {

        mixins: [ ShapeContainer, EventHandler ],

        constructor: function ( container ) {
            this.callBase();
            if ( utils.isString( container ) ) {
                container = document.getElementById( container );
            }
            this.container = container;

            this.node = this.createSVGNode();
            this.node.paper = this;
            container.appendChild( this.node );

            this.node.appendChild( this.resourceNode = svg.createNode( 'defs' ) );
            this.node.appendChild( this.shapeNode = svg.createNode( 'g' ) );

            this.resources = new Container();
            this.callMixin();
        },

        createSVGNode: function () {
            var node = svg.createNode( 'svg' );
            node.setAttribute( "xmlns", "http://www.w3.org/2000/svg" );
            node.setAttribute( "xmlns:xlink", "http://www.w3.org/1999/xlink" );
            return node;
        },

        getNode: function () {
            return this.node;
        },

        getContainer: function () {
            return this.container;
        },

        getWidth: function () {
            return this.node.getAttribute( 'width' );
        },

        setWidth: function ( width ) {
            this.node.setAttribute( 'width', width );
            return this;
        },

        getHeight: function () {
            return this.node.getAttribute( 'height' );
        },

        setHeight: function ( height ) {
            this.node.setAttribute( 'height', height );
            return this;
        },

        getViewBox: function () {
            var attr = this.node.getAttribute( 'viewBox' );
            if ( attr === null ) {
                return {
                    x: 0,
                    y: 0,
                    width: this.getWidth(),
                    height: this.getHeigth()
                };
            } else {
                attr = attr.split( ' ' );
                return {
                    x: +attr[ 0 ],
                    y: +attr[ 1 ],
                    width: +attr[ 2 ],
                    height: +attr[ 3 ]
                };
            }
        },

        setViewBox: function ( x, y, width, height ) {
            this.node.setAttribute( 'viewBox', [ x, y, width, height ].join( ' ' ) );
            return this;
        },

        addResource: function ( resource ) {
            this.resources.appendItem( resource );
            if ( resource.node ) {
                this.resourceNode.appendChild( resource.node );
            }
            return this;
        },

        removeResource: function ( resource ) {
            if ( resource.remove ) {
                resource.remove();
            }
            if ( resource.node ) {
                this.resourceNode.removeChild( resource.node );
            }
            return this;
        }
    } );
} );