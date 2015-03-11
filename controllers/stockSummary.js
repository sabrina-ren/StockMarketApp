/**
 * Created by sabrinaren on 15-03-07.
 */

StockMarket.StockSummaryController = Ember.ArrayController.extend({
    actions: {
        // TODO: Fix sorting bug where properties are changed but table doesn't update
        sortByVolume: function(){
            if (this.get('sortProperties') != 'shareVolume') {
                this.set('sortProperties', ['shareVolume']);
                this.set('sortAscending', false);
            }
        },
        sortByGainers: function(){
            if (!((this.get('sortProperties') == 'changeNet') && (this.get('sortAscending') == false))) {
                this.set('sortProperties', ['changeNet']);
                this.set('sortAscending', false);
            }
        },
        sortByLosers: function(){
            if (!((this.get('sortProperties') == 'changeNet') && (this.get('sortAscending') == true))) {
                this.set('sortProperties', ['changeNet']);
                this.set('sortAscending', true);
            }
        }
    }
});