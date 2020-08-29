/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('template_histories', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    template_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    component_json: {
      type: DataTypes.JSON,
      allowNull: true
    },
    html_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_delete: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'template_histories'
  });
};
