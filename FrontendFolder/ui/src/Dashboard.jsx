import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [Details, setDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/user/dashboard")
      .then((res) => res.json())
      .then((details) => setDetails(details))
      .catch((err) => console.log(err));
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="dashboard-container">

      <h1 className="welcome-text">
        Welcome <span>{localStorage.getItem("userName")}</span>
      </h1>

      <div className="table-container">
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>

          <tbody>
            {Details.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.mobile_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="logout-btn" onClick={logout}>Log Out</button>
    </div>
  );
}
