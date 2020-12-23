describe("Stock", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE',
      sharePrice: originalSharePrice
    })
  });

  it("should have a share price", function() {
    expect(stock.sharePrice).toEqual(originalSharePrice);
  });

  describe("when fetched", function() {
    var fetched = false;

    beforeEach(function() {
      stock.fetch({
        success: function () {
          fetched = true;
        }
      });

      waitsFor(function (argument) {
        return fetched;
      }, 'Timeout fetching stock data', 2000);
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.18);
    });
  });
});