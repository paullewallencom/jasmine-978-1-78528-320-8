describe("Stock", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE'
    });
  });

  describe("when fetched", function() {
    beforeEach(function() {
      spyOn($, 'getJSON').and.callFake(function(url, callback) {
        callback({ sharePrice: 20.13 });
      });

      stock.fetch();
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});
