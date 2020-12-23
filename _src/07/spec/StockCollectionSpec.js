describe("StockCollection", function() {
  var collection, fakeServer;

  beforeEach(function() {
    fakeServer = sinon.fakeServer.create();
    fakeServer.respondWith(JSON.stringify([
      {
        symbol: 'AOUE',
        sharePrice: 20.13
      },
      {
        symbol: 'COUY',
        sharePrice: 14
      }
    ]));
  });

  afterEach(function() {
    fakeServer.restore();
  });


  describe("given a collection", function() {
    beforeEach(function() {
      collection = new StockCollection();
    });

    it("should be a Backbone Collection", function() {
      expect(collection).toEqual(jasmine.any(Backbone.Collection));
    });

    it("should be of Stocks", function() {
      expect(collection.model).toBe(Stock);
    });
  });


  describe("given an empty collection", function() {
    beforeEach(function() {
      collection = new StockCollection();
    });

    describe("when fetch", function() {
      beforeEach(function() {
        collection.fetch();
        fakeServer.respond();
      });

      it("should request to the root stocks URL", function() {
        var url = '/stocks';
        expect(fakeServer.requests[0].url).toEqual(url);
      });

      it("should create new models with the correct share price", function() {
        expect(collection.get('AOUE').get('sharePrice')).toEqual(20.13);
        expect(collection.get('COUY').get('sharePrice')).toEqual(14);
      });
    });
  });


  describe("given a populated collection", function() {
    var model1, model2;

    beforeEach(function() {
      model1 = new Stock({ symbol: 'AOUE' });
      model2 = new Stock({ symbol: 'COUY' });

      collection = new StockCollection([
        model1,
        model2
      ]);
    });

    describe("when fetch", function() {
      beforeEach(function() {
        collection.fetch();
        fakeServer.respond();
      });

      it("should have request by the Stocks it contains", function() {
        // encoded '/stocks?ids[]=AOUE&ids[]=COUY'
        var url = '/stocks?' + $.param({ ids: ['AOUE', 'COUY'] });

        expect(fakeServer.requests[0].url).toEqual(url);
      });

      it("should update its models share price", function() {
        expect(model1.get('sharePrice')).toEqual(20.13);
        expect(model2.get('sharePrice')).toEqual(14);
      });
    });
  });
});