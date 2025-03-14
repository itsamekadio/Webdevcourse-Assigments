const{Sequelize } = require('sequelize');
const pg =new Sequelize ('blog_for_assigment3','postgres','1234',{
    host:'localhost',
    dialect:'postgres',
    logging:false,

});
module.exports = pg;