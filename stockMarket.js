/**
 * Created by sabrinaren on 15-03-06.
 */

StockMarket = Ember.Application.create();

StockMarket.ApplicationSerializer = DS.LSSerializer.extend();
StockMarket.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'StockMarket'
})
// Use fixture adapter for preloaded data
StockMarket.CompanyAdapter = DS.FixtureAdapter;