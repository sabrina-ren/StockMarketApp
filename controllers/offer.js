/**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.OfferController = Ember.Controller.extend({
    actions: {
        submit: function(){
            var route = this;
            var matchingBid = this.get('model').get('bids').find(function(bid) {
                return (bid.get('volume') == route.get('inputVolume') && bid.get('price') == route.get('inputPrice'));
            });
            if (matchingBid) {
                matchingBid.destroyRecord();

                this.get('model').set('lastSale', route.get('inputPrice'));
                this.get('model').set('shareVolume', route.get('inputVolume'));
            } else {
                var newOffer = this.store.createRecord('offer', {
                    company: this.get('model'),
                    volume: this.get('inputVolume'),
                    price: this.get('inputPrice')
                });
                newOffer.save();
            }
            route.transitionToRoute('stockSummary');
            this.set('inputVolume', '');
            this.set('inputPrice', '');
        },
        cancel: function(){
            this.transitionToRoute('stockSummary');
        }
    }
});