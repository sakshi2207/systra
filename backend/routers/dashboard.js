const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwtGenerator=require('../jwtGenerator');

//routers
router.post('/register',  async (req,res)=>{
    const {first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,ac_no} = req.body;
    try{
          const emp = await pool.query("SELECT * FROM emp WHERE email = $1", [
              email
            ]);
            if (emp.rows.length > 0) {
              return res.status(401).json("Employee already exist!");
            }
            var password = Math.random().toString(36).slice(-8);
          
  
         
        
         var nameParts = email.split("@");
          var username = nameParts.length==2 ? nameParts[0] : null;
  
         const newEmp=await pool.query(
             "INSERT INTO emp (username,first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,account_no,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
             [username,first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,ac_no,bcryptPassword]
         );
         const jwtToken = jwtGenerator(newEmp.rows[0].emp_id);
         console.log(`Your Password is ${password}`);
         return res.json({jwtToken,password});
  
     }catch(err){
      console.log(err.message);
      res.status(500).send("Server error");
     }
  });
  router.post("/login",  async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const emp = await pool.query("SELECT * FROM emp WHERE email = $1", [
          email
        ]);
    
        if (emp.rows.length === 0) {
          return res.status(401).json("Invalid Credential");
        }
    
        
    
        if (password != emp.rows[0].password) {
          return res.status(401).json("Invalid Credential");
        }
        const jwtToken = jwtGenerator(emp.rows[0].emp_id);
        return res.json({ jwtToken });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });
    router.post("/verify",  (req, res) => {
      try {
        res.json(true);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });
    router.post("/",  async (req, res) => {
        try {
          const emp = await pool.query(
            "SELECT * FROM emp WHERE emp_id = $1",
            [req.emp.id] 
          ); 
        
          res.json(emp.rows[0]);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
        }
      });
module.exports=router;