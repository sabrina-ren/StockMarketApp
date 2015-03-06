/**
 * Created by CONNOR FRASER on 05/03/2015.
 */

StockMarket.Company = DS.Model.extend({
    name: DS.attr('string'),
    openPrice: DS.attr('number'),
    currentPrice: DS.attr('number'),
    sellOrders: DS.hasMany('sellOrder'),
    buyOrders: DS.hasMany('buyOrder')
});