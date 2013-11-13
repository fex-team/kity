beforeEach( function () {
    // customMatcher 例子
    this.addMatchers( {
        //用的时候这么用:
        //expect('***').customMatchers(true);
        //expect('***').not.customMatchers(true);
        customMatchers: function ( expected ) {
            return expected === true;
        },

        toImplement: function ( extension ) {
            var instance = this.actual;
            var notImplements = [];
            for ( var m in extension.prototype ) {
                if ( typeof ( instance[ m ] ) != 'function' ) {
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