const express= require('express');
const cors= require('cors');
const pool=require('./db');

const app= express();
const port = 5000;

//middleware

app.use(cors());
app.use(express.json());


//routes

app.use("/auth", require("./routers/dashboard"));
 
app.get("/emp",(req,res)=>{
    pool.query("SELECT * FROM emp")
    .then(emp=>res.json(emp))
    .catch(err=>res.json(err.message));

});

app.get("/emp/:id",(req,res)=>{
    const {id}=req.params;
    pool.query("SELECT * FROM emp WHERE id=$1",[id])
    .then(emp=>res.json(emp))
    .catch(err=>console.log(err.message));

})
app.put("/emp/:id",(req,res)=>{
    pool.query("UPDATE emp SET password=$1 WHERE id=$2",
    [req.body.password,req.params])
    .then(emp=>res.json(emp))
    .catch(err=>console.log(err.message));
});

app.delete("/emp/:id",(req,res)=>{
    pool.query("DELETE * FROM emp WHERE id=$1",[req.params])
    .then(()=>res.json("Employee Deleted"))
    .catch(err=>console.log(err.message));
})

app.listen(port,()=>{
    console.log(`server has started on port ${port}`);
})
// {
//     "firstname":"sakshi",
//     "lastname":"malik",
//     "designation":"cs",
//     "department":"c",
//     "business":"it",
//     "email":"abc@gmail.com",
//     "bank_name":"punb",
//     "bank_branch":"gb",
//     "bank_ifsc":"ffgg",
//     "account_no":"122222222222222"


// }