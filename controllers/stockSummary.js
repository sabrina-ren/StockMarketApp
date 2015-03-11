/**
 * Created by sabrinaren on 15-03-07.
 */

StockMarket.StockSummaryController = Ember.ArrayController.extend({
    actions: {
        // Sort table by share volume, descending
        sortByVolume: function(){
            // Prevent resorting since companies with the same share volume will reshuffle
            if (this.get('sortProperties') != 'shareVolume') {
                this.set('sortProperties', ['shareVolume']);
                this.set('sortAscending', false);
            }
        },
        // Sort table by net change, descending
        sortByGainers: function(){
            // Prevent resorting since companies with the same share volume will reshuffle
            if (!((this.get('sortProperties') == 'changeNet') && (this.get('sortAscending') == false))) {
                this.set('sortProperties', ['changeNet']);
                this.set('sortAscending', false);
            }
        },
        // Sort table by net change, ascending
        sortByLosers: function(){
            // Prevent resorting since companies with the same share volume will reshuffle
            if (!((this.get('sortProperties') == 'changeNet') && (this.get('sortAscending') == true))) {
                this.set('sortProperties', ['changeNet']);
                this.set('sortAscending', true);
            }
        }
    }
});