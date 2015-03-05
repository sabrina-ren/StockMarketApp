StockMarket = Ember.Application.create();

StockMarket.ApplicationSerializer = DS.LSSerializer.extend();
StockMarket.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'StockMarket'
});