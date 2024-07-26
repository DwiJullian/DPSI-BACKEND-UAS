const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcryptjs');

const Akun = sequelize.define('Akun', {
    akun_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('staff', 'pelanggan'),
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate: async (akun) => {
            const salt = await bcrypt.genSalt(10);
            akun.password = await bcrypt.hash(akun.password, salt);
        }
    }
});


module.exports = Akun;