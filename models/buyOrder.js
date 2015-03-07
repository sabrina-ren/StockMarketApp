/**
 * Created by CONNOR FRASER on 05/03/2015.
 */

StockMarket.BuyOrder = DS.Model.extend({
    company: DS.belongsTo('company'),
    number: DS.attr('number'),
    price: DS.attr('number')
});