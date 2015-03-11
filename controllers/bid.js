  /**
 * Created by sabrinaren on 15-03-08.
 */

StockMarket.BidController = Ember.Controller.extend({
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
                var matchingOffer = this.get('model').get('offers').find(function(offer) {
                    return (offer.get('volume') == volume && offer.get('price') == price);
                });

                // If a matching offer was found, make the transaction
                if (matchingOffer) {
                    matchingOffer.destroyRecord();

                    this.get('model').set('lastSale', price);
                    this.get('model').set('shareVolume', this.get('model').get('shareVolume') + volume);

                    alert('A matching offer was found.');
                }
                // If no matching offers were found, save this order
                else {
                    var newBid = this.store.createRecord('bid', {
                        company: this.get('model'),
                        volume: volume,
                        price: price
                    });
                    newBid.save();
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