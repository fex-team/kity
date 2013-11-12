define(function (require, exports, module) {
    var doc = document;
    var ns = 'http://www.w3.org/2000/svg';
    var id = 0;
    return {
        createNode: function (name) {
            var node = doc.createElementNS(ns, name);
            node.id = 'kity_' + name + '_' + id++;
            return node;
        },
        defaults: {
            stroke: 'none',
            fill: 'none'
        }
    };
});