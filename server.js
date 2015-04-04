var express = require('express');
var bodyParser = require('body-parser');
var sem = require('semaphore')(1); // Only one client is allowed to access semaphore at one time

// Set up Mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://sabsandconnor4lyfe:yaypassword@ds059471.mongolab.com:59471/networks2');

// Set up app
var app = express();

var logger = require('./logger');
app.use(logger);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Mongoose Schemas
var companiesSchema = mongoose.Schema({
    id: Number,
    name: String,
    openPrice: Number,
    currentPrice: Number,
    changeValue: Number,
    changeIcon: String,
    changePercentage: Number,
    changeDirection: Number,
    shareVolume: Number,
    symbolURL: String
});

// Orders schema will be used for both buy orders and sale orders
var ordersSchema = mongoose.Schema({
    timeStamp: String,
    size: Number,
    price: Number,
    company: String
});

var transactionSchema = mongoose.Schema({
    timeStamp: String,
    size: Number,
    price: Number,
    company: String
});

var Companies = mongoose.model('companies', companiesSchema);
var BuyOrders = mongoose.model('buyorders', ordersSchema);
var SaleOrders = mongoose.model('saleorders', ordersSchema);
var Transactions = mongoose.model('transactions', transactionSchema);

// HTTP request handling

//  Return all companies
app.get('/companies', function (request, response) {
    sem.take(function() {
        Companies.find(function (error, docs) {
            sem.leave();
            if (error) response.send(error);
            response.json({companies:docs});
        });
    });
});

// Return all buy orders
app.get('/buyOrders', function(request, response){
    sem.take(function() {
        BuyOrders.find(function (error, docs) {
            sem.leave();
            if (error) response.send(error);
            response.json({buyOrders:docs});
        });
    });
});

// Return all sale orders
app.get('/saleOrders', function(request, response){
    sem.take(function() {
        SaleOrders.find(function (error, docs) {
            sem.leave();
            if (error) response.send(error);
            response.json({saleOrders:docs});
        });
    });
});

// Create a company
app.post('/companies', function(request, response){
    sem.take(function() {
        // Create company with name, openPrice, and symbolURL since stockStateSummary.js creates records with only these three attributes
        var company = new Companies({
            name: request.body.company.name,
            openPrice: request.body.company.openPrice,
            symbolURL: request.body.company.symbolURL
        });
        company.save(function(error) {
            sem.leave();    // Leave semaphore after last request
            if (error) response.send(error);
            response.status(201).json({companies: company});
        });
    });
});

// Create a buy order
app.post('/buyOrders', function(request, response){
    sem.take(function() {
        var order = new BuyOrders({
            timeStamp: request.body.buyOrder.timeStamp,
            size: request.body.buyOrder.size,
            price: request.body.buyOrder.price,
            company: request.body.buyOrder.company
        });
        order.save(function(error) {
            sem.leave();    // Leave semaphore after last request
            if (error) response.send(error);
            response.status(201).json({buyOrder: order});
        });
    });
});

// Create a sale order
app.post('/saleOrders', function(request, response){
    sem.take(function() {
        var order = new SaleOrders({
            timeStamp: request.body.saleOrder.timeStamp,
            size: request.body.saleOrder.size,
            price: request.body.saleOrder.price,
            company: request.body.saleOrder.company
        });
        order.save(function(error) {
            sem.leave();
            if (error) response.send(error);
            response.status(201).json({saleOrder: order});
        });
    });
});

// Create a transaction
app.post('/transactions', function(request, response){
    sem.take(function() {
        var transaction = new Transactions({
            timeStamp: request.body.transaction.timeStamp,
            size: request.body.transaction.size,
            price: request.body.transaction.price,
            company: request.body.transaction.company
        });
        transaction.save(function(error) {
            sem.leave();
            if (error) response.send(error);
            response.status(201).json({transaction: transaction});
        });
    });
});

// Update a company with new info
app.put('/companies/:company_id', function(request, response){
    sem.take(function() {
        // Find company to update
        Companies.findOne(
            {_id: request.params.company_id}, function(error, company) {
                if (error){
                    sem.leave();
                    response.send(error);
                }

                // Update every attribute
                for (var key in request.body.company) {
                    company[key] = request.body.company[key];
                }

                company.save(function(error) {
                    sem.leave();
                    if (error) response.send(error);
                    response.status(201).json({companies: company});
                });
            }
        );
    });
});

// Delete a buy order
app.delete('/buyOrders/:buyOrder_id', function(request, response){
    sem.take(function() {
        BuyOrders.remove({
            _id: request.params.buyOrder_id
        }, function(error, buyOrder) {
            sem.leave();
            if (error) response.send(error);
            response.status(201).json({buyOrders: BuyOrders});
        });
    });
});

// Delete a sale order
app.delete('/saleOrders/:saleOrder_id', function(request, response){
    sem.take(function() {
        console.log("delete a sale" + JSON.stringify(request.params));
        SaleOrders.remove({
            _id: request.params.saleOrder_id
        }, function(error, saleOrder) {
            sem.leave();
            if (error) response.send(error);
            response.status(201).json({saleOrders: SaleOrders});
        });
    });


});

app.listen(3700, function () {
    console.log('Listening on port 3700');
});



