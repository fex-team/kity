define(function(require, exports, module) {

    var TextContent = require('graphic/textcontent');
    var ShapeContainer = require('graphic/shapecontainer');
    var svg = require('graphic/svg');
    var offsetHash = {};

    function getTextBoundOffset(text) {
        var style = window.getComputedStyle(text.node);
        var font = [style.fontFamily,
            style.fontSize,
            style.fontStretch,
            style.fontStyle,
            style.fontVariant,
            style.fontWeight
        ].join('-');

        if (offsetHash[font]) {
            return offsetHash[font];
        }

        var textContent = text.getContent();
        text.setContent('test');

        var bbox = text.getBoundaryBox(),
            y = text.getY() + +text.node.getAttribute('dy');

        var topOffset = y - bbox.y,
            bottomOffset = topOffset - bbox.height;

        text.setContent(textContent);

        return (offsetHash[font] = {
            top: topOffset,
            bottom: bottomOffset,
            middle: (topOffset + bottomOffset) / 2
        });
    }

    return require('core/class').createClass('Text', {
        base: TextContent,

        mixins: [ShapeContainer],

        constructor: function(content) {
            this.callBase('text');
            if (content !== undefined) {
                this.setContent(content);
            }
        },

        setX: function(x) {
            this.node.setAttribute('x', x);
            return this;
        },
        setPosition: function(x, y) {
            return this.setX(x).setY(y);
        },
        setY: function(y) {
            this.node.setAttribute('y', y);
            return this;
        },
        getX: function() {
            return +this.node.getAttribute('x') || 0;
        },

        getY: function() {
            return +this.node.getAttribute('y') || 0;
        },

        setFont: function(font) {
            this.callBase(font);
            return this.setVerticalAlign(this.getVerticalAlign());
        },

        setTextAnchor: function(anchor) {
            this.node.setAttribute('text-anchor', anchor);
            return this;
        },

        getTextAnchor: function() {
            return this.node.getAttribute('text-anchor') || 'start';
        },

        // top/bottom/middle/baseline
        setVerticalAlign: function(align) {
            this.whenPaperReady(function() {
                var dy;
                switch (align) {
                    case 'top':
                        dy = getTextBoundOffset(this).top;
                        break;
                    case 'bottom':
                        dy = getTextBoundOffset(this).bottom;
                        break;
                    case 'middle':
                        dy = getTextBoundOffset(this).middle;
                        break;
                    default:
                        dy = 0;
                }
                this.node.setAttribute('dy', dy);
            });
            this.verticalAlign = align;
            return this;
        },

        getVerticalAlign: function() {
            return this.verticalAlign || 'baseline';
        },

        setStartOffset: function(offset) {
            // only for text path
            if (this.shapeNode != this.node) {
                this.shapeNode.setAttribute('startOffset', offset * 100 + '%');
            }
        },

        addSpan: function(span) {
            this.addShape(span);
            return this;
        },

        setPath: function(path) {
            var textpath = this.shapeNode;
            if (this.shapeNode == this.node) {
                // 当前还不是 textpath
                textpath = this.shapeNode = svg.createNode('textPath');
                while (this.node.firstChild) {
                    this.shapeNode.appendChild(this.node.firstChild);
                }
                this.node.appendChild(textpath);
            }
            textpath.setAttributeNS(svg.xlink, 'xlink:href', '#' + path.node.id);
            this.setTextAnchor(this.getTextAnchor());
            return this;
        }
    });
});