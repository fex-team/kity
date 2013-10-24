define("Shape", {
	mixin: [
		"Styled",
		"EventHandler"
	],
  constructor: function( nodeName ) {
    this._node = document.createElementNs( "http://www.w3.org/2000/svg", nodeName );
  },
  setId: function( id ) {
  	this._node.id = id;
  	return this;
  },
  getId: function() {
  	return this._node.id;
  },
  getType: function() {
  	throw new Error("Not Implemented.");
  },
  getX: function() {
  	return this.getBoundaryBox().x;
  },
  getY: function() {
  	return this.getBoundaryBox().y;
  }
);