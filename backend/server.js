const express= require('express');
const cors= require('cors');
const jwtGenerator=require('./jwtGenerator');
const validInfo=require('./middleware/validInfo');
const authorize=require('./middleware/authorize');
const pool=require('./db');

const router=express.Router();
const app= express();
const port = 5000;

//middleware

app.use(cors());
app.use(express.json());


//routes
router.post('/register',validInfo,async (req,res)=>{
  const {first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,ac_no} = req.body;
  try{
        const emp = await pool.query("SELECT * FROM emp WHERE email = $1", [
            email
          ]);
          if (emp.rows.length > 0) {
            return res.status(401).json("Employee already exist!");
          }
          var password = Math.random().toString(36).slice(-8);
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(password, salt);      

       
      
       constnameParts = email.split("@");
        const username = nameParts.length==2 ? nameParts[0] : null;

       const newEmp=await pool.query(
           "INSERT INTO emp (username,first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,account_no,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
           [username,first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,ac_no,bcryptPassword]
       );
       const jwtToken = jwtGenerator(newEmp.rows[0].emp_id);
       alert(`Your Password is ${password}`);
       return res.json({jwtToken});

   }catch(err){
    console.log(err.message);
    res.status(500).send("Server error");
   }
});
router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const emp = await pool.query("SELECT * FROM emp WHERE email = $1", [
        email
      ]);
  
      if (emp.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        emp.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].emp_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  router.post("/home", authorize, async (req, res) => {
    try {
      const emp = await pool.query(
        "SELECT username FROM emp WHERE emp_id = $1",
        [req.emp.id] 
      ); 
    
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

app.get("/emp",(req,res)=>{
    pool.query("SELECT * FROM emp")
    .then(emp=>res.json(emp))
    .catch(err=>console.log(err.message));

});

app.get("/emp/:emp_id",(req,res)=>{
    const {id}=req.params;
    pool.query("SELECT * FROM emp WHERE id=$1",[id])
    .then(emp=>res.json(emp))
    .catch(err=>console.log(err.message));

})
app.put("/emp/:emp_id",(req,res)=>{
    pool.query("UPDATE emp SET firstname=$1 WHERE id=$2",
    [req.body.firstname,req.params])
    .then(emp1=>res.json(emp1))
    .catch(err=>console.log(err.message));
});

app.delete("/emp/:emp_id",(req,res)=>{
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