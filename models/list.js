var mongoose = require('mongoose');
var ListSchema = require('../schemas/list');
var List = mongoose.model('List',ListSchema);
module.exports = List;