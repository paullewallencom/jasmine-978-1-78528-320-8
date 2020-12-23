define([
  'backbone',
  'underscore'
],
function (Backbone, _) {
  var InvestmentView = Backbone.View.extend({
    template: template,
    className: 'investment',
    tagName: 'li',
    events: {
      'click .destroy-investment': destroy
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render, this);
      this.listenTo(this.model, 'destroy', this.remove, this);
    },

    render: function () {
      this.$el.html(template({
        symbol: this.model.get('stock').get('symbol'),
        roi: formatedRoi.call(this)
      }));

      addClass.call(this);

      return this;
    },

    setVisible: function (value) {
      if (value) {
        this.$el.show();
      } else {
        this.$el.hide();
      }
      return this;
    }
  });

  function formatedRoi () {
    return (this.model.get('roi') * 100).toFixed(2) + '%';
  }

  function destroy () {
    this.model.destroy();
  }

  function addClass () {
    if (this.model.get('isGood')) {
      this.$el.addClass('good-investment');
      this.$el.removeClass('bad-investment');
    } else {
      this.$el.removeClass('good-investment');
      this.$el.addClass('bad-investment');
    }
  }

  var template = _.template([
    '<h1><%= symbol %></h1>',
    '<p><%= roi %></p>',
    '<button class="destroy-investment">remove</button>'
  ].join('\n'));

  return InvestmentView;
});
