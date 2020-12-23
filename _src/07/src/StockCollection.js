(function (Backbone, Stock) {

  var StockCollection = Backbone.Collection.extend({
    model: Stock,
    url: function () {
      return "/stocks" + idsQueryString.call(this);
    }
  });

  function modelIds () {
    return this.map(function (model) { return model.id; });
  }

  function idsQueryString () {
    var ids = modelIds.call(this);

    if (ids.length === 0) { return ''; }
    return '?' + $.param({ ids: ids });
  }

  this.StockCollection = StockCollection;

})(Backbone, Stock);
