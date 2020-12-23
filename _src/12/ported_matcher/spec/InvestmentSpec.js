describe("Investment", function() {
  var stock;
  var investment;

  beforeEach(function() {
    stock = new Stock();
    investment = new Investment({
      stock: stock,
      shares: 100,
      sharePrice: 20
    });
  });

  describe("when its stock share price is the same as its price", function() {
    beforeEach(function() {
      stock.sharePrice = 20;
    });

    it("should be a bad investment", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

  describe("when its stock share price valorizes", function() {
    beforeEach(function() {
      stock.sharePrice = 40;
    });

    it("should be a good investment", function() {
      expect(investment).toBeAGoodInvestment();
    });
  });

  describe("when its stock share price devalorizes", function() {
    beforeEach(function() {
      stock.sharePrice = 0;
    });

    it("should be a bad investment", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });
});
