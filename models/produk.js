const { DataTypes } = require('sequelize');
const sequelize = require('./index');
 // import model supplier

const Produk = sequelize.define('Produk', {
    id_produk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_produk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
 timestamps: false
});


module.exports = Produk;