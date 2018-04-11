const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileAsync')

const adapter = new FileAsync('database.json')
const db = low(adapter)