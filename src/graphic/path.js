define("kity.Path", function () {
  super: "kity.Shape",
  constructor: function() {
    super.constructor.call(this, "path");
  },
  getPathData: function() {
    return this._node.getAttribute("d");
  },
  setPathData: function(data) {
    this._node.setAttribute("d", data);
  }
});