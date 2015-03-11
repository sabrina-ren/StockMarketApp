/**
 * Created by CONNOR FRASER on 06/03/2015.
 */
StockMarket.StockSummaryRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('company');
    },
    afterModel: function(companies, transition) {
        console.log(transition);

        if (companies.get('length') > 1 && transition.targetName == 'stockSummary.index') {
            this.transitionTo('company', companies.get('firstObject'));
        }
    }
});