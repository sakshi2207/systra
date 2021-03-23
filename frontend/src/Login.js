import React, {  useState } from "react";
import { Link} from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
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
        toast.success("Logged in Successfully");
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
            <h1 className="mt-5 text-center">Login</h1>
            <form action="post" onSubmit={onSubmitForm}>
                <input name="email" type="text" placeholder="Email" name="email" value={email} onChange={e => onChange(e)}
          className="form-control my-3" />
               
                <input type="password" placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"/>
               
                <button class="btn btn-success btn-block">Submit</button>
            </form>
            <hr/>
            <p className="text-center">OR</p>
            
            <div>
                <h5 className="text-center">Create a new Account</h5>
                <Link to="/register" className="btn btn-success btn-block">Register</Link>
            </div>
        </div>
    );
}
export default Login;
