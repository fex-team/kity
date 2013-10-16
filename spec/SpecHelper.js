beforeEach(function() {
    ///////////这只是个例子
  this.addMatchers({
    customMatchers: function(expected) {
      return expected==true;
    }
      //用的时候这么用:expect('***').customMatchers(true);
      //             expect('***').not.customMatchers(true);
  });
});
