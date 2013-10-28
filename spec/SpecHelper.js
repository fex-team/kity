beforeEach(function() {
    // customMatcher 例子
    this.addMatchers({
        //用的时候这么用:
        //expect('***').customMatchers(true);
        //expect('***').not.customMatchers(true);
        customMatchers: function(expected) {
          return expected==true;
        },

        hasImplement: function(extension) {
            var instance = this.actual;
            var notImplements = [];
            for(var m in extension.prototype) {
                if( typeof(instance[m]) != 'function' ) {
                    notImplements.push(m);
                }
            }
            this.message = function() {
                if(notImplements.length) {
                    return "未实现接口：" + notImplements.join(', ');
                } else {
                    return "已实现" + extension.toString() + '的所有接口';
                }
            }
            return notImplements.length == 0;
        }
    });
});
