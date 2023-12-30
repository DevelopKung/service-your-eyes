const db = require("../models");
const Bookings = db.Bookings;
const momentTimezone = require('moment-timezone').tz('Asia/Bangkok')
const moment = require('moment')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  queryData: async (params) => {
    try {
      // let toDay = moment().utc().startOf('day').toDate()
      let query = []
      if (params) {
        let start = params.start ? moment(params.start, 'YYYY-MM-DD').startOf('day').toDate() : null
        let end = params.end ? moment(params.end, 'YYYY-MM-DD').endOf('day').toDate() : null
        if (start && end) {
          query.push({
            $match: {
              $and: [
                {
                  $or: [
                    { 'booking_date.start': null },
                    { 'booking_date.start': { $gte: start } }
                  ]
                },
                {
                  $or: [
                    { 'booking_date.end': null },
                    { 'booking_date.end': { $lte: end } }
                  ]
                }
              ]
            }
          })
        }
      }

      query.push({
        $lookup: {
          from: db.Lists.collection.collectionName,
          localField: 'booking_lists_id',
          foreignField: 'lists_id',
          as: 'booking_lists'
        }
      },
      {
        $unwind: {
          path: "$booking_lists",
          preserveNullAndEmptyArrays: true
        }
      })
      
      const response = await Bookings.aggregate(query)
      return response
    } catch (error) {
      return []
    }
  },

  queryInfo: async (id) => {
    try {
      if (id) {
        const response = await Bookings.aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: db.Lists.collection.collectionName,
              localField: 'booking_lists_id',
              foreignField: 'lists_id',
              as: 'booking_lists'
            }
          },
          {
            $unwind: {
              path: "$booking_lists",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 1,
              booking_name: 1,
              booking_phone: 1,
              booking_total: 1,
              booking_social: 1,
              booking_discount: 1,
              booking_color: 1,
              booking_remark: 1,
              booking_mascara: 1,
              booking_status: 1,
              "booking_date.start": 1,
              "booking_date.end": 1,
              "booking_lists._id": "$booking_lists._id",
              "booking_lists.lists_id": "$booking_lists.lists_id",
              "booking_lists.lists_name": "$booking_lists.lists_name",
              "booking_lists.lists_price": "$booking_lists.lists_price",
              "booking_lists.status": "$booking_lists.status",
              "booking_lists.created_date": "$booking_lists.created_date",
            }
          }
        ])
        return (response && response.length > 0) ? response[0] : null
      } else {
        return null
      }
    } catch (error) {
      console.log(error);
      return []
    }
  },
}