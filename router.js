StockMarket.Router.map(function() {
    this.resource('stockSummary', {path: '/'}, function(){
        this.resource('company', {path: 'company/:company_id'}, function(){
            this.resource('marketByOrder');
            this.resource('marketByPrice');
        });
    });
    this.route('bid', {path: 'bid/:company_id'});
    this.route('offer', {path: 'offer/:company_id'});
})