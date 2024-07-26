const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Pelanggan = require('./pelanggan');
const Produk = require('./produk');
const Staff = require('./staff');

const Pesanan = sequelize.define('Pesanan', {
    id_pesanan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pelanggan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pelanggan,
            key: 'id_pelanggan'
        }
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    kuantitas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_staff: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Staff,
            key: 'id_staff'
        }
    },
    id_produk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produk,
            key: 'id_produk'
        }
    }
});

// Mendefinisikan relasi antara Pesanan dan tabel lainnya
Pesanan.belongsTo(Pelanggan, { foreignKey: 'id_pelanggan' });
Pelanggan.hasMany(Pesanan, { foreignKey: 'id_pelanggan' });

Pesanan.belongsTo(Produk, { foreignKey: 'id_produk' });
Produk.hasMany(Pesanan, { foreignKey: 'id_produk' });

Pesanan.belongsTo(Staff, { foreignKey: 'id_staff' });
Staff.hasMany(Pesanan, { foreignKey: 'id_staff' });

module.exports = Pesanan;
