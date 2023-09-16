const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.USER,
  password: process.env.password,
  database: process.env.database,
  port: process.env.dbport,
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connection", connection.state);
  }
});

const DbService = {
  getAllData: async () => {
    try {
      return await new Promise((resolve, reject) => {
        const query = "SELECT * FROM user";
        connection.query(query, (err, res) => {
          if (err) reject(new Error(err.message));
          console.log(res);
          resolve(res);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  postdata: async (body) => {
    try {
      const date = new Date();
      return await new Promise((resolve, reject) => {
        const query = "INSERT INTO user (fullName,date,address) VALUES (?,?,?)";
        connection.query(query, [body.name, date, body.address], (err, res) => {
          if (err) reject(new Error(err.message));
          resolve(res);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteData: async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        const query = "DELETE FROM user WHERE id = ?";
        connection.query(query, [id], (err, res) => {
          if (err) reject(new Error(err.message));
          resolve(res);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  putdata: async (body) => {
    try {
      console.log(body);
      return await new Promise((resolve, reject) => {
        const query = "UPDATE user SET fullName = ?,address = ? WHERE id = ?";
        connection.query(
          query,
          [body.name, body.address, body.id],
          (err, res) => {
            if (err) reject(new Error(err.message));
            resolve(res);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  },

  userExist: async (username) => {
    try {
      return await new Promise((resolve, reject) => {
        const query = "SELECT * FROM register WHERE userName = ?";
        return connection.query(query, [username], (err, res) => {
          if (res.length === 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    } catch (err) {
      console.log("arsebobs");
    }
  },

  registerUser: async (user) => {
    try {
      return new Promise((resolve, reject) => {
        const fullName = user.firstName + " " + user.lastName;
        const date = new Date();
        const query =
          "INSERT INTO register (fullName, userName, email, password, date) VALUES (?,?,?,?,?)";
        connection.query(
          query,
          [fullName, user.userName, user.email, user.password, date],
          (err, res) => {
            if (err) reject(new Error(err));
            resolve(res);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  },
  getUserbyUserName: async (userName) => {
    try {
      return await new Promise((resolve, reject) => {
        const query = "SELECT * FROM register WHERE userName = ?";
        connection.query(query, [userName], (err, res) => {
          if (err) reject(new Error(err));
          resolve(res);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  addOrder: async (order) => {
    const date = new Date();
    try {
      return new Promise((resolve, reject) => {
        const query =
          "INSERT INTO orders (userId,productName,cost,img) values (?,?,?,?)";
        connection.query(
          query,
          [order.userId, order.productName, order.cost, order.imgDir],
          (err, res) => {
            if (err) reject(new Error(err));
            resolve(res);
          }
        );
      });
    } catch (err) {
      onsole.log(err);
    }
  },
  getOrder: async () => {
    return await new Promise((resolve, reject) => {
      const query =
        "SELECT  register.fullName, orders.productName,orders.id, orders.cost,orders.img, register.email FROM register  JOIN orders ON register.id = orders.userId ORDER BY orders.cost";
      connection.query(query, (err, res) => {
        if (err) reject(new Error(err));
        resolve(res);
      });
    });
  },
};

module.exports = DbService;
