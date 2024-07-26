const express = require('express');
const router = express.Router();
const Akun = require('../models/akun');
const Staff = require('../models/staff');
const Pelanggan = require('../models/pelanggan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, role, usia, no_handphone } = req.body;
        
        // Buat akun baru
        const newUser = await Akun.create({ username, password, role });
        const id = newUser.akun_id
        // Buat data staff jika role adalah 'staff'
        if (role === 'staff') {
            await Staff.create({ nama_staff : username , usia, akun_id: id });
        }

        // Buat data pelanggan jika role adalah 'pelanggan'
        if (role === 'pelanggan') {
            await Pelanggan.create({ nama_pelanggan : username, no_handphone, akun_id: newUser.akun_id });
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
});

// Rute login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Akun.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
            next(err);
    }
});

module.exports = router;
