define( function(require, exports, module) {
    var doc = document;
    var ns = 'http://www.w3.org/2000/svg';
    return {
        createNode: function(name) {
            return doc.createElementNS(ns, name);
        }
    }
});