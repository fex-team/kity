define(function(require, exports, module) {
	var createClass = require('core/class').createClass;
	var utils = require('core/utils');
	var svg = require('graphic/svg');
	return createClass("Kity.graphic.Paper", {

		constructor: function( container ) {
			this.callBase();
			if(utils.isString( container )) {
				container = document.getElementById( container );
			}
			this.node = svg.createNode('svg');
			container.appendChild(this.node);
		},

		getWidth: function() {
			return this.node.getAttribute("width");
		},

		setWidth: function( width ) {
			this.node.setAttribute("width", width);
			return this;
		},

		getHeigth: function() {
			return this.node.getAttribute("height");
		},

		setHeight: function() {
			this.node.getAttribute("height");
		},

		setViewBox: function() {
			var attr = this.node.
		}
	});
});