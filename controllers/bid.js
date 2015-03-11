  /**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.BidController = Ember.Controller.extend({
    actions: {
        submit: function(){
            var route = this;
            var matchingOffer = this.get('model').get('offers').find(function(offer) {
                return (offer.get('volume') == route.get('inputVolume') && offer.get('price') == route.get('inputPrice'));
            });
            if (matchingOffer) {
                matchingOffer.destroyRecord();

                this.get('model').set('lastSale', route.get('inputPrice'));
                this.get('model').set('shareVolume', this.get('model').get('shareVolume') + parseFloat(route.get('inputVolume')));
            } else {
                var newBid = this.store.createRecord('bid', {
                    company: this.get('model'),
                    volume: parseFloat(this.get('inputVolume')),
                    price: parseFloat(this.get('inputPrice'))
                });
                newBid.save();
            }
            route.transitionToRoute('company', this.get('model'));
            this.set('inputVolume', '');
            this.set('inputPrice', '');
        },
        cancel: function(){
            this.transitionToRoute('company', this.get('model'));
        }
    }
});