const jwt =require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(emp_id){
    const payload={
        emp:{
            id:emp_id
        }
    };
    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:'1hr'});
}
module.exports=jwtGenerator;