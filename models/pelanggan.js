const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Akun = require('./akun')

const Pelanggan = sequelize.define('Pelanggan', {
    id_pelanggan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_pelanggan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_handphone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    akun_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Akun,
            key: 'akun_id'
        }
    }
});

Pelanggan.belongsTo(Akun, { foreignKey: 'akun_id' });
Akun.hasOne(Pelanggan, { foreignKey: 'akun_id' });


module.exports = Pelanggan;