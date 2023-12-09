const db = require("../models");
const Bookings = db.Bookings;
const service = require("../service/booking");
const msg = require("../json/msg.json");
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  findAll: async (req, res) => {
    try {
      let result = await service.queryData(req.query)
      res.status(200).send({ status: true, message: msg.success, payload: result });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message || msg.err });
    }
  },

  findOne: async (req, res) => {
    const _id = req.params.id;
    if (_id) {
      let result = await service.queryInfo(_id)
      res.status(200).send({ status: true, message: msg.success, payload: result });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },

  create: async (req, res) => {
    try {
      let form = req.body
      if (form.booking_name && form.booking_lists_id && form.booking_total && form.booking_date) {
        if (form.booking_date) {
          let check = await Bookings.findOne({ booking_date: form.booking_date })
          if (check) {
            return res.status(400).send({ status: false, message: msg.duplicate.replace('{msg}', "วัน-เวลา") });
          }
        }
        Bookings.create(form).then((result) => {
          if (result.booking_id) {
            res.status(200).send({ status: true, message: msg.success })
          } else {
            res.status(403).send({ status: false, message: msg.not_found })
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
    const _id = new ObjectId(req.params.id);
    let { 
      booking_name, 
      booking_lists_id, 
      booking_total, 
      booking_date, 
      booking_phone, 
      booking_social,
      booking_discount,
      booking_color,
      booking_remark
    } = req.body
    if (_id && booking_name && booking_lists_id && booking_total && booking_date) {
      const update = { 
        $set: { 
          booking_name,
          booking_total, 
          booking_lists_id, 
          booking_total, 
          booking_date,
          booking_phone,
          booking_social,
          booking_discount,
          booking_color,
          booking_remark,
          updated_date: new Date()
        } 
      }
      Bookings.updateOne({ _id }, update).then(data => {
        if (data.acknowledged) {
          res.status(200).send({ status: true, message: msg.success })
        } else {
          res.status(403).send({ status: false, message: msg.not_found })
        }
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || msg.err });
      });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },

  delete: async (req, res) => {
    const _id = new ObjectId(req.params.id);
    if (_id) {
      Bookings.deleteOne({ _id }).then(async (data) => {
        res.status(200).send({ status: true, message: msg.success })
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || msg.err });
      });
    } else {
      res.status(400).send({ status: false, message: msg.bad_request });
    }
  },
}
