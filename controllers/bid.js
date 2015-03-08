/**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.BidController = Ember.Controller.extend({
    actions: {
        submit: function(){
            var newBid = this.store.createRecord('bid', {
                company: this.get('model'),
                volume: this.get('inputVolume'),
                price: this.get('inputPrice')
            });
            newBid.save();
            this.transitionToRoute('stockSummary');
        },
        cancel: function(){
            this.transitionToRoute('stockSummary');
        }
    }
});