/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fid: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    object_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    order_sn: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    order_type: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    order_money: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    goods_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    order_remark: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    pay_channel: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_id: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    apple_original_transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apple_pay_receipt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    apple_pay_receipt_json: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pay_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    pay_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    refund_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    gold_add_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    platform: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    package_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'orders'
  });
};
