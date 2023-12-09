const msg = require("../json/msg.json");
const db = require("../models");
const Bookings = db.Bookings;
const service = require("../service/booking");
const moment = require('moment')

module.exports = {
  discount: async (req, res) => {
    let payload = [
      { id: 1, value: 0, text: 'ราคาเต็ม', type: '' },
      { id: 2, value: 5, text: '5%', type: 'percent' },
      { id: 3, value: 10, text: '10%', type: 'percent' },
      { id: 4, value: 20, text: '20 บ.', type: 'bath' }
    ]
    res.status(200).json({ status: true, message: msg.success, payload })
  },
  calendar: async (req, res) => {
    try {
      let response = await service.queryData()
      const payload = response.map(x => ({
        id: x._id,
        color: x.booking_color,
        start: moment(x.booking_date),
        end: moment(x.booking_date).add(1, 'hours'),
        timed: true,
        name: x.booking_name,
        remark: x.booking_remark,
        total: x.booking_total,
        detail: {
          discount: x.booking_discount.text,
          phone: x.booking_phone,
          social: x.booking_social
        }
      }))
      
      res.status(200).json({ status: true, message: msg.success, payload })
    } catch (error) {
      res.status(200).json({ status: true, message: msg.success, payload: [] })
    }
  },
}