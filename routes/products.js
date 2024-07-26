var express = require('express');
var router = express.Router();
const Product = require('../models/produk');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan produk baru
router.post('/', authenticate, authorize(['staff']), async (req, res, next) => {
    try {
        const { nama_produk, harga } = req.body;
        const newProduct = await Product.create({ nama_produk, harga });
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan semua produk
router.get('/', authenticate, async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan produk berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan produk berdasarkan ID
router.get('/:id', authenticate, authorize(['staff']), async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menampilkan produk berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ message: 'Product not found' });
    }
    } catch (err) {
    next(err);
    }
   });
   
   // Endpoint untuk memperbarui produk berdasarkan ID
   router.put('/:id', authenticate, authorize(['staff']), async (req, res, next) => {
    try {
        const { nama_produk, harga } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.nama_produk = nama_produk;
            product.harga = harga;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus produk berdasarkan ID
router.delete('/:id', authenticate, async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;