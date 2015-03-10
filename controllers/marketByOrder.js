/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.MarketByOrderController = Ember.Controller.extend({
    needs:['company'],
    sortedBids: [],
    sortingBids: function() {
        this.set('sortedBids', this.get('model').get('bids'));
        alert('changed!');
    }.observes('bids').on('init')

    //sortedBids: function(){
    //    return model.get('bids').sort(function(obj1, obj2){
    //       return parseFloat(obj2.get('price')) - parseFloat(obj1.get('price'));
    //    });
    //}.property(model.get('bids'))
});