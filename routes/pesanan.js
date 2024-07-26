var express = require('express');
var router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Pesanan = require('../models/pesanan');

// disini rute agar pelanggan dapat membuat pesanannya
router.post('/', authenticate, authorize(['pelanggan']), async (req, res, next) => {
    try {
        const { id_pelanggan, harga, kuantitas, id_staff, id_produk } = req.body;
        const newPesanan = await Pesanan.create({ id_pelanggan, harga, kuantitas, id_staff, id_produk });
        res.status(201).json(newPesanan);
    } catch (err) {
        next(err);
    }
});

//disini rute untuk staff yang dapat melihat pesanan pelanggan
router.get('/',authenticate, authorize(['staff']), async (req, res, next) => {
    try {
        const getPesanan = await Pesanan.findAll();
        res.json(getPesanan);
    } catch (err) {
        next(err);
    }
});



module.exports = router;