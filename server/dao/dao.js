"use strict"

var config = {
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : process.env.DB_PORT
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  config.database,
  config.user, 
  config.password, 
  {
    host : config.host, 
    port : config.port, 
    dialect : 'mysql' , 
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    define: { timestamps: false }
   } );

global.CURRENT_TIMESTAMP = Sequelize.CURRENT_TIMESTAMP;

//使用方法
var Template_histories = require('./../models/template_histories')(sequelize,Sequelize);
var Templates = require('./../models/templates')(sequelize,Sequelize);
function LoadDao(modelFileRequire){
  return modelFileRequire(sequelize,Sequelize);
}

exports.LoadDao = LoadDao;


exports.Models = {
    Template_histories,
    Templates
}

//导出外部使用
exports.sequelize = sequelize;

