/**
 * Created by CONNOR FRASER on 10/03/2015.
 */
StockMarket.MarketByOrderController = Ember.Controller.extend({
    needs:['company'],

    sortedBids: function(){

        var company = this.get('controllers.company.model');

        return company.get('bids').sort(function(obj1, obj2){
            return parseFloat(obj2.get('price')) - parseFloat(obj1.get('price'));
        });

    }.property(this.get('controllers.company.model').get('bids'))

/*
    sortedBids: function(){
        return model.get('bids').sort(function(obj1, obj2){
           return parseFloat(obj2.get('price')) - parseFloat(obj1.get('price'));
        });
    }.property(model.get('bids'))
*/
});