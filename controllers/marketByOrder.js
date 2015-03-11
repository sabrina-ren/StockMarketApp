/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.MarketByOrderController = Ember.Controller.extend({
    sortedOrders: [],
    sortingBids: function() {
        // Descending bids
        var sortedBids = this.get('model').get('bids').sortBy('price');

        // Ascending offers
        var sortedOffers = this.get('model').get('offers').sortBy('price').reverse();
        
        // Show 10 orders
        var sortedOrders = [];
        for (i=0; i < 10; i++) {
            var newOrder = {};
            if (sortedBids.length > i) {
                newOrder.bidVolume = sortedBids.objectAt(i).get('volume');
                newOrder.bidPrice = sortedBids.objectAt(i).get('price');
            }
            if (sortedOffers.length > i) {
                newOrder.sellVolume = sortedOffers.objectAt(i).get('volume');
                newOrder.sellPrice = sortedOffers.objectAt(i).get('price');
            }
            sortedOrders.addObject(newOrder);
        }
        this.set('sortedOrders', sortedOrders);
    }.observes('model').on('init')
});