/**
 * Created by CONNOR FRASER on 06/03/2015.
 */
StockMarket.StockSummaryRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('company');
    },
    afterModel: function(companies, transition) {
        if (companies.get('length') > 1) {
            this.transitionTo('company', companies.get('firstObject'));
        }
    }
});