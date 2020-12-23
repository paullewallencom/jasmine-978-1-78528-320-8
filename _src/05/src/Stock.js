(function ($) {
  function Stock (parameters) {
    var params = parameters || {};
    this.symbol = params.symbol;
    this.sharePrice = params.sharePrice;
  }

  Stock.prototype.fetch = function(parameters) {
    var that = this;
    var params = parameters || {};
    var success = params.success || function () {};
    var url = 'http://0.0.0.0:8000/stocks/'+that.symbol;

    $.getJSON(url, function (data) {
      that.sharePrice = data.sharePrice;
      success(that);
    });
  };

  this.Stock = Stock;
})(jQuery);
