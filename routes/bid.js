/**
 * Created by CONNOR FRASER on 06/03/2015.
 */
StockMarket.BidRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    }
});