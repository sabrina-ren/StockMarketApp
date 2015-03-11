/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.MarketByPriceController = Ember.Controller.extend({
    sortedOrders: [],
    sortingBids: function() {
        var sortedBids = this.get('model').get('bids').sortBy('price');
        var sortedOffers = this.get('model').get('offers').sortBy('price');
        var sortedOrders = [];
        var size = 10;

        var buyCounts = [];
        var buyVolumes = [];
        var buyPrices = [];
        var sellCounts = [];
        var sellVolumes = [];
        var sellPrices = [];

        for (i = 0; i < size; i++)
        {
            buyCounts[i] = 0;
            buyVolumes[i] = 0;
            buyPrices[i] = 0;
            sellCounts[i] = 0;
            sellVolumes[i] = 0;
            sellPrices[i] = 0;
        }

        populateByPriceArrays(sortedBids, buyCounts, buyVolumes, buyPrices, size);
        populateByPriceArrays(sortedOffers, sellCounts, sellVolumes, sellPrices, size);

        //populating sortedOrders
        for(j=0; j < size; j++){
            var newOrder={};
            if(buyCounts[j] != 0){
                newOrder.bidNum = buyCounts[j];
                newOrder.bidVolume = buyVolumes[j];
                newOrder.bidPrice = buyPrices[j];
            }

            if(sellCounts[j] != 0){
                newOrder.sellNum = sellCounts[j];
                newOrder.sellVolume = sellVolumes[j];
                newOrder.sellPrice = sellPrices[j];
            }

            sortedOrders.addObject(newOrder);
        }
        this.set('sortedOrders', sortedOrders);
    }.observes('model').on('init')

});

populateByPriceArrays = function(sortedArr, arrCounts, arrVolumes, arrPrices, size){
    var count = 1;
    var index = 0;
    var accumulatedVolume = 0;

    if (sortedArr.length > 0)
    {
        var start = sortedArr[0];
        accumulatedVolume = start.get('volume');
        for (i = 1; i < sortedArr.length && index < size; i++)
        {
            if (sortedArr[i].get('price') == start.get('price'))
            {
                //if price matches, increase the count and volume
                count++;
                accumulatedVolume += sortedArr[i].get('volume');
            }
            else
            {
                //if price doesn't match, input last price's data and move on to next
                arrCounts[index] = count;
                count = 1;

                arrVolumes[index] = accumulatedVolume;
                accumulatedVolume = sortedArr[i].get('volume');

                arrPrices[index] = start.get('price');
                index++;

                start = sortedArr[i];
            }
        }

        //add the leftover data upon finishing if the total amount of data is less than size
        if (index < size)
        {
            arrCounts[index] = count;
            arrVolumes[index] = accumulatedVolume;
            arrPrices[index] = start.get('price');
        }
    }
};