import "./UserTable.css";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { Button } from "react-bootstrap";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [csvData1, setCsvData1] = useState([]);
  const [csvError, setCsvError] = useState("");
  const navigate = useNavigate();

  const handleCsvFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData1 = Papa.parse(reader.result, { header: true }).data;
      setCsvData1(csvData1);
      setUsers((prevUsers) => [...prevUsers, ...csvData1]);
    };
    reader.onerror = () => {
      setCsvError("Failed to read CSV file");
    };
    reader.readAsText(file);
    console.log(reader.result)
  };
  console.log(csvData1);
  console.log(users)
  

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUsers((data));
      });
  }, []);


  const selectUserHandler = (e) => {
    console.log(e.target.value);
  };

  const exportToCsv = () => {
    const csvData = [
      [
        "#",
        "firstName",
        "lastName",
        "email",
        "dob",
        "fileUpload",
      ],

      ...users.map((user, index) => [
        index + 1,

        user.firstName,

        user.lastName,

        user.email,

        user.dob,

        user.fileUpload,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(csvData.map((row) => row.join(",")).join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  };

  const removeUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-5">
                <h2>User Data</h2>
              </div>

              <div className="col-sm-7">
                <a href="#" className="btn btn-secondary">
                  <i className="material-icons">&#xE147;</i> <span></span>
                  <input
                    type="file"
                    className="btn btn-sm"
                    accept=".csv"
                    onChange={handleCsvFile}
                  />
                  {/* <button onClick={uploadHandler}>Upload File</button> */}
                </a>

                <button className="btn btn-secondary" onClick={exportToCsv}>
                  <i className="material-icons">&#xE24D;</i>{" "}
                  <span>Export to Excel</span>
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email address</th>
                <th>Date of Birth</th>
                <th>Uploaded File</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  {/* <td><input
                    type="checkbox"
                    name="user.firstName"
                    onChange={(e) => selectUserHandler(e)}
                  /></td> */}
                  <td><input
                    type="checkbox"
                    name="user.firstName"
                    onChange={(e) => selectUserHandler(e)}
                  />&nbsp;{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.fileUpload}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => removeUser(index)}
                    ></AiFillDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="primary">
            Update
          </Button>
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>{users.length}</b> entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
