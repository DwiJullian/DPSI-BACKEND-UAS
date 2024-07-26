
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Akun = require('./akun')

const Staff = sequelize.define('Staff', {
 id_staff: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
 },
 nama_staff: {
    type: DataTypes.STRING,
    allowNull: false
 },
 usia: {
    type : DataTypes.INTEGER,
    allowNull: false
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

Staff.belongsTo(Akun, { foreignKey: 'akun_id' });
Akun.hasOne(Staff, { foreignKey: 'akun_id' });

module.exports = Staff;