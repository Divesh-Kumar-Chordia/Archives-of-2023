const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection =mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err) =>{
    if(err) console.log(err.message);
   // console.log('db'+connection.state);
    }
);
//instance of Db service

class DbService{
    static getDbServiceInstance(){
        return  new DbService();
    }
    async getAllData() {
        try {
        
        const response = await new Promise ((resolve, reject)=> {
        const query = "SELECT * FROM names;";
        
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
        });
        return response;

        } catch (error) { I
        console.log(error);
        }
        }
}
module.exports = DbService;