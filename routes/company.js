/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.BidRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    }
});