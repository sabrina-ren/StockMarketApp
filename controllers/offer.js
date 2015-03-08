/**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.OfferController = Ember.Controller.extend({
    actions: {
        submit: function(){
            // TODO: Check for matching bids and offers
            var matchingBids = this.store.find('bid', {
                volume: this.get('inputVolume'),
                price: this.get('inputPrice')
            });
            var newOffer = this.store.createRecord('offer', {
                company: this.get('model'),
                volume: this.get('inputVolume'),
                price: this.get('inputPrice')
            });
            newOffer.save();
            this.transitionToRoute('stockSummary');
        },
        cancel: function(){
            this.transitionToRoute('stockSummary');
        }
    }
});