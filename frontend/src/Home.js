import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PieChart } from 'react-minimal-pie-chart';


const Home = ({setAuth}) => {
  const [name, setName] = useState("");
  const [emps,setEmps]= useState([]);

  const getEmp = async () => {
    try {
      const response = await fetch("http://localhost:5000/emp",{
        method:"GET"
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setEmps(jsonData.rows);
      console.log(emps);
    } catch (err) {
      console.error(err.message);
    }
  };
 
  const getProfile = async () => {
    try {
        const res = await fetch("http://localhost:5000/auth/", {
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
  const myFunction =(item)=>{
    return(
      <tr key={item.emp_id}>
          <td> {[item.first_name,item.last_name].join(" ")}</td>
          <td>{item.designation}</td>
          <td>{item.business}</td>
          <td>{item.department}</td>
          <td>{item.bank_name}</td>
          <td>{item.bank_branch}</td>
          <td>{item.bank_ifsc}</td>
          <td>{item.email}</td>
          <td>{item.account_no}</td>
          
       </tr>
    )
  }
  
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
                 <table row={10} style={{width:"80%",backgroundColor:"yellow",border:"2px solid black",borderCollapse:"collapse"}}>
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
                       {console.log()}
                    {emps.map(myFunction)}
                    </tbody>
                 </table>
                 <h1 className="btn btn-info" >See the chart</h1>
                 <div className="content">
                    <PieChart  style={{width:"40%",margin:"auto 100px"}}
                              data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                              ]}
                            />;
                 </div>
              </div>

  );
};

export default Home;
