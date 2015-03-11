/**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.OfferController = Ember.Controller.extend({
    actions: {
        submit: function(){
            var price = parseFloat(this.get('inputPrice'));
            var volume = parseFloat(this.get('inputVolume'));

            // Validate input
            if (isNaN(price) || isNaN(volume)) {
                alert('Please enter a numeric value');
            } else if (price <= 0 || volume <= 0) {
                alert('Please enter a valid number above 0');
            } else {
                var matchingBid = this.get('model').get('bids').find(function (bid) {
                    return (bid.get('volume') == volume && bid.get('price') == price);
                });

                // If a matching bid was found, make the transaction
                if (matchingBid) {
                    matchingBid.destroyRecord();

                    this.get('model').set('lastSale', price);
                    this.get('model').set('shareVolume', this.get('model').get('shareVolume') + volume);
                    alert('A matching bid was found.');
                }
                // If no matching bids were found, save this offer
                else {
                    var newOffer = this.store.createRecord('offer', {
                        company: this.get('model'),
                        volume: volume,
                        price: price
                    });
                    newOffer.save();
                }
                // Go back to the correct company page
                this.transitionToRoute('company', this.get('model'));

                // Clear the form
                this.set('inputVolume', '');
                this.set('inputPrice', '');
            }
        },
        cancel: function(){
            this.transitionToRoute('company', this.get('model'));
        }
    }
});