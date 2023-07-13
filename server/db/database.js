const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Establishing database connection'))

const db = new Sequelize(`postgres://postgres:postgres@127.0.0.1:5432/${pkg.name}`, {

  logging: false
})

module.exports = db 