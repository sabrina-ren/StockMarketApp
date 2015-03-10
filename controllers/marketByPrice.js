/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.MarketByPriceController = Ember.Controller.extend({
    sortedOrders: [],
    sortingBids: function() {
        var sortedBids = this.get('model').get('bids').sortBy('price');
        var sortedOffers = this.get('model').get('offers').sortBy('price');

        var sortedOrders = [];
        for (i=0; i <= 10; i++) {
            var newOrder = {};
            if (sortedBids.length > i) {
                newOrder.bidVolume = sortedBids.objectAt(i).get('volume');
                newOrder.bidPrice = sortedBids.objectAt(i).get('price');
            }
            if (sortedOffers.length > i) {
                newOrder.sellVolume = sortedOffers.objectAt(sortedOffers.length - 1 - i).get('volume');
                newOrder.sellPrice = sortedOffers.objectAt(sortedOffers.length - 1 - i).get('price');
            }
            sortedOrders.addObject(newOrder);
        }
        this.set('sortedOrders', sortedOrders);
    }.observes('model').on('init')
})