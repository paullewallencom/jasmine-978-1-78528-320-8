beforeEach(function() {
  jasmine.Expectation.addMatchers({
    toBeAGoodInvestment: function() {
      return {
        compare: function (actual) {
          var pass = actual.isGood();
          var what = pass ? 'bad' : 'good';

          return {
            pass: pass,
            message: 'Expected investment to be a '+ what +' investment'
          };
        }
      };
    }
  });
});
