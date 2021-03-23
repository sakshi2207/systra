import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [emp,setEmp]= useState([]);

  const getEmp = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo");
      const jsonData = await response.json();

      setEmp(jsonData);
    } catch (err) {
      toast.error(err.message);
    }
  };
 
  const getProfile = async emp_id => {
    try {
        const res = await fetch(`http://localhost:5000/emp/${emp_id}`, {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();

      setName(parseData.first_name+parseData.last_name);
      
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  
 
  useEffect(() => {
    getProfile();
    getEmp();
  }, []);

  return (
    <div style={{backgroundColor:"lightblue"}}>
      <h1 className="mt-5">Home</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      <hr/>
      <h1 className="text-center mt-5">Employee Table</h1>
                 <table style={{width:"100%",backgroundColor:"yellow",border:"2px solid black",borderCollapse:"collapse"}}>
                     <thead>
                             <th>Emp_id</th>
                             <th >Firstname</th>
                             <th>Lastname</th>
                             <th>Designation</th>
                             <th>Business</th>
                             <th>Department</th>
                             <th>Bank Name</th>
                             <th>Bank Branch</th>
                             <th>Bank ifsc</th>
                             <th>E-mail</th>
                             <th>Account No.</th>
                     </thead>
                     <tbody>
                    {emp.map(item=>(
                         <tr key={item.emp_id}>
                             <td>{item.first_name}</td>
                             <td>{item.last_name}</td>
                             <td>{item.designation}</td>
                             <td>{item.business}</td>
                             <td>{item.department}</td>
                             <td>{item.bank_name}</td>
                             <td>{item.bank_branch}</td>
                             <td>{item.bank_ifsc}</td>
                             <td>{item.email}</td>
                             <td>{item.ac_no}</td>
                             
                          </tr>
                        ))}
                    </tbody>
                 </table>
                 <Link to="/chart" className="btn btn-info">See the chart</Link>
              </div>

  );
};

export default Home;
