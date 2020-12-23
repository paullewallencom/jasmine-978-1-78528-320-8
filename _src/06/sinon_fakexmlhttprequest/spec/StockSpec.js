describe("Stock", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE',
      sharePrice: originalSharePrice
    });
  });

  it("should have a share price", function() {
    expect(stock.sharePrice).toEqual(originalSharePrice);
  });

  describe("when fetched", function() {
    var xhr;

    beforeEach(function() {
      var fetchRequest;

      xhr = sinon.useFakeXMLHttpRequest();

      xhr.onCreate = function (request) {
        fetchRequest = request;
      };

      stock.fetch();

      fetchRequest.respond(
        200,
        { "Content-Type": "application/json" },
        '{ "sharePrice": 20.13 }'
      );
    });

    afterEach(function() {
      xhr.restore();
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});
