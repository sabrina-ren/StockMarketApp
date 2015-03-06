StockMarket.Router.map(function() {
    this.resource('summary', {path: '/'}, function(){
        this.resource('company');
        this.resource('marketByOrder');
        this.resource('marketByPrice');
    });
    this.route('bid', {path: 'bid/:company'});
    this.route('sell', {path: 'sell/:company'});
})