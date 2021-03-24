import React, { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";

function Register({ setAuth }){
  const [password,setPassword]=useState();
  const [inputs, setInputs] = useState({
    first_name:"",
    last_name:"",
    designation:"",
    business:"",
    department:"",
    bank_name:"",
    bank_branch:"",
    bank_ifsc:"",
    ac_no:"",
    email: ""
  });

  const { first_name, last_name, designation,business,department,email,bank_name,bank_branch,bank_ifsc,ac_no} = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
          first_name, last_name, designation,business,department,email,bank_name,bank_branch,bank_ifsc,ac_no};
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        setPassword(parseRes.password);
        toast.success(`Your password is ${parseRes.password}`);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

    return (
        <div>
            <h1 className="mt-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <label  for="firstname">Firstname</label>
                <input name="first_name" type="text" 
                value={first_name}
                placeholder="firstname"
                onChange={e => onChange(e)}
                className="form-control my-3"/>
                <label  for="lastname">Lastname</label>
                <input name="last_name" type="text" 
                        value={last_name}
                  placeholder="lastname"
                  onChange={e => onChange(e)}
                  className="form-control my-3"/>
                <label  for="designation">Designation</label>
                <select name="designation"  className="form-control my-3">
                    <option value="engineer">Engineer</option>
                    <option value="doctor">Doctor</option>
                    <option value="teacher">Teacher</option>
                </select>
                <label for="department">Department</label>
                <select name="department"  className="form-control my-3">
                    <option value="Management">Management</option>
                    <option value="IT">IT</option>
                    <option value="education">Education</option>
                </select>
                <label for="Business">Business</label>
                    <select name="business"  className="form-control my-3" >
                        <option value="construction">Construtor</option>
                        <option value="education">Education</option>
                        <option value="IT">IT</option>
                    </select>
                <label for="email" >Email</label>
                <input name="email" type="email" value={email}
                placeholder="email"
                onChange={e => onChange(e)}
                className="form-control my-3"/>
                <label for="bank_name">Bank Name</label>
                <input type="text" name="bank_name" value={bank_name}
                  onChange={e => onChange(e)}
                  className="form-control my-3"/>
                <label for="bank_branch" >Bank Branch</label>
                <input type="text" name="bank_branch" value={bank_branch}
                onChange={e => onChange(e)}
                className="form-control my-3"/> 
                <label for="banck_ifsc">Bank IFSC</label>
                <input type="text" name="bank_ifsc" value={bank_ifsc}
                onChange={e => onChange(e)}
                className="form-control my-3"/>
                <label for="ac_no">A/C no.</label>
                <input type="number" name="ac_no" value={ac_no}
                onChange={e => onChange(e)}
                className="form-control my-3"/>
                
                <button className="btn btn-success btn-block">Submit</button>       
                {password!=undefined && `Your password is ${password}`}
            </form>
            <hr/>
            <p className="text-center">OR</p>
            
            <div>
                <h5 className="text-center">Already have an Account Sign Up</h5>
                <Link className="btn btn-success btn-block" to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Register;
