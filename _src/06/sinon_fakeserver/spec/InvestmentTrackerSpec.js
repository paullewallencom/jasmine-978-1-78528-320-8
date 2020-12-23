describe("InventmentTracker", function() {
  beforeEach(function() {
    listView = new InvestmentListView({
      id: 'investment-list'
    });

    newView = new NewInvestmentView({
      id: 'new-investment'
    });

    application = new InvestmentTracker({
      listView: listView,
      newView: newView
    });
  });

  describe("when a new investment is created", function() {
    beforeEach(function() {

    });
    it("should add the investment to the list", function() {

    });
  });
});