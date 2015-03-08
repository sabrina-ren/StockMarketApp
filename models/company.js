/**
 * Created by CONNOR FRASER on 05/03/2015.
 */

StockMarket.Company = DS.Model.extend({
    name: DS.attr('string'),
    logoURL: DS.attr('string'),
    openPrice: DS.attr('number'),
    lastSale: DS.attr('number', {
        defaultValue: function() { return 42.59; }
    }),
    shareVolume: DS.attr('number', {
        defaultValue: function() { return 0; }
    }),
    offers: DS.hasMany('offer'),
    bids: DS.hasMany('bid'),

    changeNet: function() {
        return (this.get('lastSale') - this.get('openPrice')).toFixed(2);
    }.property('openPrice', 'lastSale'),
    changePercentage: function() {
        return (this.get('changeNet') / this.get('openPrice')).toFixed(2) + '%';
    }.property('openPrice', 'lastSale', 'changeNet'),

    // TODO: change this into a Handlebars helper
    changeIconName: function() {
        var change = this.get('changeNet');
        if (change > 0) return 'assets/up.png';
        else if (change < 0) return 'assets/down.png';
        else return 'assets/noChange.png';
    }.property('changeNet')
});