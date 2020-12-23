describe("InvestmentListView", function() {

  describe("given two investments", function() {
    beforeEach(function() {
      collection = new Backbone.Collection([
        {
          sharePrice: 11,
          stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
        },
        {
          sharePrice: 12,
          stock: new Stock({ symbol: 'COUY', sharePrice: 12})
        }
      ]);

      view = new InvestmentListView({
        collection: collection
      })
    });

    describe("when rendering", function() {
      beforeEach(function() {
        view.render();
      });

      it("should render both investments", function() {
        expect(view.$el).toContainHtml('AOUE');
        expect(view.$el).toContainHtml('COUY');
      });
    });
  });


  describe("when adding investments", function() {
    beforeEach(function() {
      collection = new Backbone.Collection();

      investment = new Investment({
        sharePrice: 11,
        stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
      });

      view = new InvestmentListView({
        collection: collection
      });
    });

    describe("to a rendered list of investments", function() {
      beforeEach(function() {
        view.render();

        collection.add(investment);
      });

      it("should render the investment", function() {
        expect(view.$el).toContainHtml('AOUE');
      });
    });

    describe("to a not rendered list of investments", function() {
      beforeEach(function() {
        collection.add(investment);
      });

      it("should not render the investment", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });
  });


  describe("when removing investments", function() {
    beforeEach(function() {
      investment = new Investment({
        sharePrice: 11,
        stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
      });

      collection = new Backbone.Collection([investment]);

      view = new InvestmentListView({
        collection: collection
      });
    });

    describe("to a rendered list of investments", function() {
      beforeEach(function() {
        view.render();

        collection.remove(investment);
      });

      it("should remove the investment", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });

    describe("to a not rendered list of investments", function() {
      beforeEach(function() {
        collection.remove(investment);
      });

      it("should not render the investment", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });
  });

});
