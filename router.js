StockMarket.Router.map(function() {
    this.resource('stockSummary', {path: '/'}, function(){
        this.resource('company');
        this.resource('marketByOrder');
        this.resource('marketByPrice');
    });
    this.route('bid', {path: 'bid/:company_id'});
    this.route('offer', {path: 'offer/:company_id'});
})