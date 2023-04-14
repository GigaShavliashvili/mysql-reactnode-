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
                const query = "SELECT * FROM person";
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
                const query =
                    "INSERT INTO person (fullName,date,address) VALUES (?,?,?)";
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
                const query = "DELETE FROM person WHERE id = ?";
                connection.query(query, [id], (err, res) => {
                    if (err) reject(new Error(err.message))
                    resolve(res)
                })
            })
        } catch (err) {
            console.log(err)
        }
    },
    putdata: async (body) => {
        try {
            console.log(body)
            return await new Promise((resolve, reject) => {
                const query = "UPDATE person SET fullName = ?,address = ? WHERE id = ?"
                connection.query(query, [body.name, body.address, body.id], (err, res) => {
                    if (err) reject(new Error(err.message))
                    resolve(res)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
};

module.exports = DbService;
