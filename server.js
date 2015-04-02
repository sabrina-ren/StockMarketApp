var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://sabsandconnor4lyfe:yaypassword@ds059471.mongolab.com:59471/networks2');

var app = express();

var logger = require('./logger');
app.use(logger);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var companiesSchema = mongoose.Schema({
    id: Number,
    name: String,
    openPrice: Number,
    symbolURL: String
});

var Companies = mongoose.model('companies', companiesSchema);

app.get('/companies', function (request, response) {
    Companies.find(function (error, docs) {
        if (error) response.send(error);
        console.log("companies: "+ docs);

        response.json({companies:docs});
    });
});

app.get('/buyOrders', function(request, response){
    //get all the buy orders
});

app.get('/saleOrders', function(request, response){
    //get all the sale orders
});

app.post('/companies', function(request, response){
    //create a company
});

app.post('/buyOrders', function(request, response){
    //create a buy orders
});

app.post('/saleOrders', function(request, response){
    //create a sell orders
});

app.post('/transactions', function(request, response){
    //create a transaction
});

app.put('/companies/:company_id', function(request, response){
    //update a company with new info
});

app.delete('/buyOrders/:buyOrder_id', function(request, response){
    //delete a buy order
});

app.delete('/buyOrders/:saleOrder_id', function(request, response){
    //delete a sell order
});

//app.get('/posts/:post_id', function (request, response) {

//});


/*
 var postsSchema = mongoose.Schema({
 title: String,
 body: String
 });

 var Posts = mongoose.model('Posts', postsSchema);

 app.get('/posts', function (request, response) {
 Posts.find(function (error, posts) {
 if (error) response.send(error);
 response.json({posts: posts});
 });
 });

 app.get('/posts/:post_id', function (request, response) {
 Posts.findById(request.params.post_id, function (error, post) {
 if (error) response.send(error);
 response.json({posts: post});
 });
 });

 app.post('/posts', function (request, response) {
 var post = new Posts({
 title: request.body.post.title,
 body: request.body.post.body
 });
 post.save(function(error) {
 if (error) response.send(error);
 response.status(201).json({posts: post});
 });
 });

 app.put('/posts/:post_id', function (request, response) {
 // use our Posts model to find the post we want
 Posts.findById(request.params.post_id, function (error, post) {
 if (error) response.send(error);

 // update the post info
 post.title = request.body.post.title,
 post.body = request.body.post.body

 // save the post
 post.save(function (error) {
 if (error) response.send(error);
 response.status(201).json({posts: post});
 });
 });
 });

 app.delete('/posts/:post_id', function (request, response) {
 Posts.remove({
 _id: request.params.post_id
 }, function(error, post) {
 if (error) response.send(err);
 response.status(201).json({posts: Posts});
 });

 });
 */

app.listen(3700, function () {
    console.log('Listening on port 3700');
});



