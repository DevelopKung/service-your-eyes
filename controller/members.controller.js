const db = require("../models");
const Sequelize = db.Sequelize
const sequelize = db.sequelize
const Members = db.Members;

module.exports = {

  findAll: async (req, res) => {
    Members.findAll().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  },

  findOne: async (req, res) => {
    const id = req.params._id;
    Members.findByPk(id).then(data => {
      if (data) {
        res.status(200).send({ status: "true", data });
      } else {
        res.status(404).send({ message: `Cannot find  with id=${code_id}.` });
      }
    }).catch((err) => {
      res.status(500).send({ message: `Server Error 500.`, err });
    });
  },

  create: async (req, res) => {
    let form = req.body
    form.updated_by = ''
    Members.create(form).then((result) => {
      if (result.type_id) {
        res.status(200).send({ status: true, data: "Successfully" })
      } else {
        res.status(404).send({ status: false, data: "Error" })
      }
    }).catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
  },

  update: async (req, res) => {
    const id = req.params.id;
    let form = req.body
    form.updated_date = sequelize.fn('NOW')
    Members.update(form, { where: { type_id: id } }).then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "Data was updated successfully."
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update with id = ${id}. Maybe was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        status: false,
        message: "Error updating with id= " + id,
        err
      });
    });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    if (id) {
      Members.destroy({ where: { type_id: id } }).then(async (data) => {
        res.send({ status: true, message: "was deleted successfully!" });
      })
    } else {
      res.status(404).send({
        message: `Cannot find  with id=${id}.`
      });
    }
  }
}
