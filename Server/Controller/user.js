const DbService = require("../dbservice");

module.exports = {
  getUser:async (req, res) => {
 const resp = await DbService.getAllData()
 res.json({ item1: resp, item2: resp.length })
  },
  addUser: async (req, res) => {
    const body = req.body;
    DbService.postdata(body)
      .then((dbres) => {
        res.json(dbres.insertId);
      })
      .catch((err) => console.log(err));
  },
  deleteUser: async (req, res) => {
    const { id } = req.query;
    DbService.deleteData(id)
      .then((dbres) => res.json(dbres.deleteId))
      .catch((err) => console.log(err));
  },
  updataUser: async (req, res) => {
    const body = req.body;
    console.log(body)
    DbService.putdata(body)
      .then((dbres) => res.json(dbres.putId))
      .catch((err) => console.log(err));
  },
};
