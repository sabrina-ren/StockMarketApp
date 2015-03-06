/**
 * Created by CONNOR FRASER on 06/03/2015.
 */
StockMarket.SellRoute = Ember.Route.extend({
    model: function(params) {
        var comp =  this.store.find('company', params.company._id);
        return comp.sellOrders;
    }
});