/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'core/kity.js',
            'core/utils.js',
            'core/define.js'
        ],
        baseURL = '../src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();
