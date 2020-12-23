define([
  'spec/SpecHelper',
  'sinon',
  'backbone',
  'views/InvestmentView',
  'models/Investment',
  'models/Stock'
],
function (jasmine, sinon, Backbone, InvestmentView, Investment, Stock) {
  describe("InvestmentView", function() {
    var view, investment, stock;

    beforeEach(function() {
      investment = new Investment();

      sinon.spy(InvestmentView.prototype, 'remove');
      sinon.spy(InvestmentView.prototype, 'render');

      view = new InvestmentView({
        model: investment
      });
    });

    afterEach(function() {
      InvestmentView.prototype.remove.restore();
      InvestmentView.prototype.render.restore();
    });


    describe("when the investment is destroyed", function() {
      beforeEach(function() {
        investment.trigger('destroy', investment);
      });

      it("should remove itself from the interface", function() {
        expect(view.remove).toHaveBeenCalled();
      });
    });


    describe("when the investment changes", function() {
      beforeEach(function() {
        investment.trigger('change', investment);
      });

      it("should update the interface", function() {
        expect(view.render).toHaveBeenCalled();
      });
    });


    describe("when rendering", function() {
      beforeEach(function() {
        stock = new Stock();
        sinon.stub(stock, 'get');
        stock.get.withArgs('symbol').returns('YHOO');

        sinon.stub(investment, 'get');
        investment.get.withArgs('roi').returns(0.1);
        investment.get.withArgs('stock').returns(stock);

        view.render();
      });

      it("should be a list item with 'investment' class", function() {
        expect(view.$el).toBe('li.investment');
      });

      it("should render the stock symbol", function() {
        expect(view.$el).toContainHtml('YHOO');
      });

      it("should render the return of investment as a percentage with precision of two decimal cases", function() {
        expect(view.$el).toContainHtml('10.00%');
      });

      it("should render a button to destroy the investment", function() {
        expect(view.$el).toContain('button.destroy-investment');
      });


      describe("a bad investment", function() {
        beforeEach(function() {
          investment.get.withArgs('isGood').returns(false);
          view.render();
        });

        it("should add a css class of 'bad-investment'", function() {
          expect(view.$el).toBe('.bad-investment');
        });
      });


      describe("a good investment", function() {
        beforeEach(function() {
          investment.get.withArgs('isGood').returns(true);
          view.render();
        });

        it("should add a css class of 'good-investment'", function() {
          expect(view.$el).toBe('.good-investment');
        });
      });


      describe("when the destroy button is clicked", function() {
        beforeEach(function() {
          sinon.spy(investment, 'destroy');
          view.$('.destroy-investment').click();
        });

        it("should destroy the model", function() {
          expect(investment.destroy).toHaveBeenCalled();
        });
      });
    });

  });
});
