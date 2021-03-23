import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [emp, setemp] = useState([]);
  const res2 =  fetch("http://localhost:5000/emp", {
    method: "GET",
   
  });

  const list = res2.json();


  
  console.log(list);
  const getProfile = async () => {
    try {
        const res = await fetch("http://localhost:5000/", {
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
  const deleteEmp = async id => {
    try {
      const deleteEmp = await fetch(`http://localhost:5000/emp/${id}`, {
        method: "DELETE"
      });

      setemp(emp.filter(emp => emp.emp_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Home</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      <h1 className="text-center mt-5">Employee Table</h1>
                 <table style="width:100%">
                     <thead>
                         <tr>
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
                         </tr>
                     </thead>
                     <tbody>
                    {list.map(item=>(
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
                             <td>
                               <button className="btn btn-danger"
                                onClick={() => deleteEmp(emp.emp_id)}> Delete
                                </button>
                              </td>
                          </tr>
                        ))}
                    </tbody>
                 </table>
              </div>

  );
};

export default Home;
// function Home() {
//     return (
//         <div>
//             <div className="container">
//                 <h1 className="text-center mt-5">Employee Table</h1>
//                 <table style="width:100%">
//                     {list.map(item=>(
//                         <tr key={item}><td>{item}</td></tr>
//                     ))}
//                 </table>
//             </div>
            
//         </div>
//     )
// }

// export default Home
