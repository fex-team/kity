/**
 * cmd 内部定义
 */

function use ( id ) {}

var define = ( function () {

    var modules = {};

    function define ( id, deps, factory ) {

        modules[ id ] = {

            exports: {},
            value: null,
            factory: null

        };

        if ( arguments.length === 2 ) {

            factory = deps;

        }

        if ( modules.toString.call( factory ) === '[object Object]' ) {

            modules[ id ][ 'value' ] = factory;

        } else if ( typeof factory === 'function' ) {

            modules[ id ][ 'factory' ] = factory;

        } else {

            throw new Error( 'define函数未定义的行为' );

        }

    }

    function require ( id ) {

        var module = modules[ id ],
            exports = null;

        if ( !module ) {

            return null;

        }

        if ( module.value ) {

            return module.value;

        }


        exports = module.factory.call( null, require, module.exports, module );

        // return 值不为空， 则以return值为最终值
        if ( exports ) {

            module.exports = exports;

        }

        module.value = module.exports;

        return module.value;

    }

    use = require;

    return define;

} )();