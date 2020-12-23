describe("Stock", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE'
    });
  });

  describe("when fetched", function() {
    beforeEach(function(done) {
      stock.fetch({
        success: function () {
          done();
        }
      });
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.18);
    });
  });
});
