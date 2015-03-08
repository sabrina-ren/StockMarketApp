/**
 * Created by CONNOR FRASER on 05/03/2015.
 */

StockMarket.Bid = DS.Model.extend({
    company: DS.belongsTo('company'),
    volume: DS.attr('number'),
    price: DS.attr('number')
});