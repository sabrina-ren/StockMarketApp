/**
 * Created by CONNOR FRASER on 06/03/2015.
 */
StockMarket.StockSummaryRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('company');
    }
});

// Redirect to the first company as default if none are specified
StockMarket.StockSummaryIndexRoute = Ember.Route.extend({
    afterModel: function(companies, transition) {
        this.transitionTo('company', companies.get('firstObject'));
    }
});