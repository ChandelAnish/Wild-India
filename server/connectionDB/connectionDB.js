const mysql=require('mysql2')
const sanctuarydb={
    user:process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}
const connectDB=mysql.createConnection(sanctuarydb)

connectDB.connect((err)=>{
    if(err)throw err;
    console.log(`express connected to database : hirehub_db`);
})

module.exports=connectDB;