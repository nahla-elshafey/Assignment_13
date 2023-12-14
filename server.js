var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());


var dbURL = 'mongodb+srv://nelshafey2214:<mongoMango_94>@a13db.8fcknny.mongodb.net/?retryWrites=true&w=majority';


var productSchema = new mongoose.Schema({
  id: Number,
  product: {
    productid: Number,
    category: String,
    price: Number,
    name: String,
    instock: Boolean
  }
});

var Product = mongoose.model('Product', productSchema);

// Endpoints
app.get('/product/get', async (req, res) => {
  try {
    var products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/product/create', async (req, res) => {
  var product = new Product(req.body);
  try {
    var newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/product/update/:id', async (req, res) => {
  try {
    var updatedProduct = await Product.findOneAndUpdate(
      { 'product.productid': req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/product/delete/:id', async (req, res) => {
  try {
    await Product.deleteOne({ 'product.productid': req.params.id });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

var server = app.listen(5500, () => {
  console.log('server listening on port ', server.address().port);
});
