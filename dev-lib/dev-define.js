/**
 * cmd 内部定义
 */

(function(global) {

    var _modules = {},
        loaded = {};

    global.inc = {

        base: '',

        config: function(options) {

            this.base = options.base || '';

        },

        use: function(id) {

            return require(id);

        },

        remove: function(node) {

            node.parentNode.removeChild(node);

        }

    };

    global.define = function(id, deps, f) {

        var argLen = arguments.length,
            module = null;

        switch (argLen) {

            case 1:
                var scriptNode = document.getElementsByTagName('script');
                f = id;
                id = scriptNode[scriptNode.length - 1].getAttribute("data-id");
                break;

            case 2:
                if (typeof id === 'string') {

                    f = deps;

                } else {

                    var scriptNode = document.getElementsByTagName('script');
                    f = deps;
                    id = scriptNode[scriptNode.length - 1].getAttribute("data-id");

                }

                break;

        }

        module = _modules[id] = {

            exports: {},
            value: null,
            factory: null

        };

        loadDeps(f);

        if (typeof f === 'function') {

            module.factory = f;

        } else {

            module.value = f;

        }

    }

    function require(id) {

        var exports = {},
            module = _modules[id];

        if (module.value) {

            return module.value;

        }

        exports = module.factory(require, module.exports, module);

        if (exports) {

            module.exports = exports;

        }

        module.value = module.exports;
        module.exports = null;
        module.factory = null;

        return module.value;

    }

    function loadDeps(factory) {

        var deps = null,
            pathname = location.pathname,
            uri = location.protocol + '//' + location.host;

        pathname = pathname.split('/');

        if (pathname[pathname.length - 1] !== '') {

            pathname[pathname.length - 1] = '';

        }

        uri += pathname.join('/');

        if (typeof factory === 'function') {

            deps = loadDepsByFunction(factory);

        } else {

            // 未处理object的情况
            return;

        }

        for (var i = 0, len = deps.length; i < len; i++) {

            var key = deps[i];

            if (loaded[key]) {
                continue;
            }

            loaded[key] = true;

            document.write('<script src="' + uri + inc.base + '/' + key + '.js" onload="inc.remove(this)" data-id="' + key + '"></script>');

        }

    }

    function loadDepsByFunction(factory) {

        var content = factory.toString(),
            match = null,
            deps = [],
            pattern = /require\s*\(\s*([^)]+?)\s*\)/g;

        while (match = pattern.exec(content)) {

            deps.push(match[1].replace(/'|"/g, ''));

        }

        return deps;

    }

})(this);