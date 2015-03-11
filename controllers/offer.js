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
                this.get('model').set('shareVolume', this.get('model').get('shareVolume') + parseFloat(route.get('inputVolume')));

            } else {
                var newOffer = this.store.createRecord('offer', {
                    company: this.get('model'),
                    volume: parseFloat(this.get('inputVolume')),
                    price: parseFloat(this.get('inputPrice'))
                });
                newOffer.save();
            }
            this.transitionToRoute('company', this.get('model'));
            this.set('inputVolume', '');
            this.set('inputPrice', '');
        },
        cancel: function(){
            this.transitionToRoute('company', this.get('model'));
        }
    }
});