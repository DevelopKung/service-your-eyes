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
      { id: 4, value: 15, text: '15%', type: 'percent' },
      { id: 5, value: 20, text: '20%', type: 'percent' },
      { id: 6, value: 25, text: '25%', type: 'percent' },
      { id: 7, value: 30, text: '30%', type: 'percent' },
      { id: 8, value: 50, text: '50 บ.', type: 'bath' },
      { id: 9, value: 100, text: '100 บ.', type: 'bath' },
    ]
    res.status(200).json({ status: true, message: msg.success, payload })
  },
  calendar: async (req, res) => {
    try {
      let response = await service.queryData()
      const payload = response.map(x => ({
        id: x._id,
        color: x.booking_color,
        start: moment(x.booking_date.start),
        end: moment(x.booking_date.end),
        timed: true,
        name: x.booking_name,
        remark: x.booking_remark,
        total: x.booking_total,
        mascara: x.booking_mascara,
        status: x.booking_status,
        detail: {
          discount: `${x.booking_discount.value} ${x.booking_discount.type == 'percent'? '%': 'บ.'}`,
          phone: x.booking_phone,
          social: x.booking_social,
          lists_name:  x.booking_lists ? x.booking_lists.lists_name: null,
          lists_total: x.booking_lists ? x.booking_lists.lists_price: null,
        }
      }))
      
      res.status(200).json({ status: true, message: msg.success, payload })
    } catch (error) {
      res.status(200).json({ status: true, message: msg.success, payload: [] })
    }
  },
}