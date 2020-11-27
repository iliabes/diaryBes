const { Schema, model } = require('mongoose')



module.exports = new Schema({
    good : {
      type: String,
      default: 'goodDef'
    },
    value: {
      type: String,
      default: 'valDef'
    },
    work : {
      type: String,
      default: 'goodwork'
    },
    work2: {
      type: String,
      default: 'goodwork'
    },
    list : {
      type: String,
      default: 'goodlist'
    },
    data: {
      type: String,
      default: 'gooddata'
    },
    src: {
      type: String,
      default: 'none'
    },
  });
