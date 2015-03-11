StockMarket.Router.map(function() {
    this.resource('stockSummary', {path: '/'}, function(){
        this.resource('company', {path: 'company/:company_id'}, function(){
            this.resource('marketByOrder');
            this.resource('marketByPrice');
        });
    });
    this.resource('bid', {path: 'bid/:company_id'});
    this.resource('offer', {path: 'offer/:company_id'});
})