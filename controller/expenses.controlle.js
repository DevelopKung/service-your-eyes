const db = require("../models");
const Expenses = db.Expenses;
const fc = require("../service/function");
const msg = require("../json/msg.json");

module.exports = {
  findAll: async (req, res) => {
    Expenses.find({}, { __v: 0, updated_date: 0 }).then((result) => {
      if (result) {
        res.status(200).send({ status: true, message: msg.success, payload: result });
      } else {
        res.status(403).send({ status: false, message: msg.error });
      }
    }).catch((err) => {
      res.status(500).send({ status: false, message: err.message || msg.err });
    });
  },

  findOne: async (req, res) => {
    const _id = req.params.id;
    if (_id) {
      Expenses.findOne({ _id }).then(result => {
        if (result) {
          res.status(200).send({ status: true, message: msg.success, payload: result });
        } else {
          res.status(403).send({ status: false, message: msg.error });
        }
      }).catch((err) => {
        res.status(500).send({ status: false, message: err.message || msg.err });
      });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },

  create: async (req, res) => {
    try {
      let form = req.body
      if (form.exp_name && form.exp_price && form.exp_date) {
        Expenses.create(form).then((result) => {
          if (result.exp_id) {
            res.status(200).send({ status: true, message: msg.success })
          } else {
            res.status(403).send({ status: false, message: msg.not_found})
          }
        }).catch((err) => {
          res.status(500).send({ status: false, message: err.message || msg.err });
        });
      } else {
        res.status(400).send({ status: false, message: msg.bad_request });
      }
    } catch (error) {
      res.status(500).send({ status: false, message: error.message || msg.err });
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    let form = req.body
    form.updated_date = new Date()
    if (_id && form.exp_name && form.exp_price && form.exp_date) {
      Expenses.findOneAndUpdate({ _id }, form).then(data => {
        if (data._id) {
          res.status(200).send({ status: true, message: msg.success })
        } else {
          res.status(403).send({ status: false, message: msg.not_found})
        }
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || msg.err });
      });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;
    if (_id) {
      Expenses.deleteOne({ _id }).then(async (data) => {
        res.status(200).send({ status: true, message: msg.success })
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || msg.err });
      });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },
}
