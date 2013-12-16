beforeEach( function () {
    // customMatcher 例子
    this.addMatchers( {
        //用的时候这么用:
        //expect('***').customMatchers(true);
        //expect('***').not.customMatchers(true);
//        customMatchers: function ( expected ) {
//            return expected === true;
//        },

        toImplement: function ( extension ) {
            var instance = this.actual;
            var notImplements = [];
            for ( var m in extension.prototype ) {
                if ( typeof(extension.prototype[m]) == 'function' && typeof ( instance[ m ] ) != 'function' ) {
                    notImplements.push( m );
                }
            }
            this.message = function () {
                return "未实现接口：" + notImplements.join( ', ' );
            };
            return notImplements.length === 0;
        },
        toMatchPlain: function ( expected ) {
            var actual = this.actual;
            var match = true;
            for ( var p in expected ) {
                if ( expected[ p ] !== actual[ p ] ) {
                    match = false;
                }
            }
            this.message = function () {
                return "字面量不符合预期";
            };
            return match;
        },
        toHaveSubString: function ( expected ) {
            var actual = this.actual;
            this.message = function () {
                return "未包含期望的子字符串";
            };
            return~ actual.substr( expected );
        }

    } );
} );
var src = new Array();//全局变量,引用的源码对象存放在这个数组里
var getRequire =function (srcPath,i){

    describe("getSrc", function () {

        it('getSrc', function () {
            if(i==0){//getRequires第一次调用getRequire时,清空一下数组,这里如果在getRequires里清,karma执行会出错,涉及代码执行顺序问题
                src = [];
            }
            var s;
            waitsFor(function () {
                seajs.use(srcPath, function (e) {
                    s = e;
                });
                if (s !=undefined) {
                    src.push(s);
                    return true;
                }
            }, srcPath, 500);
        });
    });
};
var getRequires =function (srcPaths){
    for(var i=0;i < srcPaths.length;i++){
        getRequire(srcPaths[i],i);
    }
};