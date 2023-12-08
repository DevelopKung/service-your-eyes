const excelToJson = require('convert-excel-to-json');

module.exports = {
  convertArray: (text) => {
    let res = (Array.isArray(text)) ? text : [text]
    return res
  },

  convertExcelToJson: (file, id) => {
    const excelToJson = require('convert-excel-to-json');
    const fs = require('fs');
    const buff = file.buffer
    const result = excelToJson({
      source: buff
    });
    result.Sheet1.splice(0, 1);
    let data = result.Sheet1.map(x => {
      return {
        member_id: id,
        product_code: x.A,
        product_name: x.B,
        product_size: x.C,
        created_by: id,
        status: true
      }
    })
    return data
  }
}