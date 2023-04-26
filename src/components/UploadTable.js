import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Papa from "papaparse";
import firebase from "firebase/compat/app";
import ModalTable from "./ModalTable";
import { Button, Modal } from "react-bootstrap";
import { db } from "../Firebase";
import "./UploadTable.css";
import DisplayData from "./DisplayData";

const UploadTable = () => {
  const [csvData1, setCsvData1] = useState([]);
  const [csvError, setCsvError] = useState("");
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [userTable, setUserTable] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // const db = firebase.firestore();
    // db.collection("users")
    //   .get()
    //   .then((querySnapshot) => {
    //     const data = querySnapshot.docs.map((doc) => doc.data());
    //     setUsers(data);
    //   });
  }, []);

  const handleCsvFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData1 = Papa.parse(reader.result, { header: true }).data;
      setCsvData1(csvData1);
    };
    reader.onerror = () => {
      setCsvError("Failed to read CSV file");
    };
    reader.readAsText(file);

    setDisable(false);
  };

  console.log(csvData1);

  const proceedHandler = () => {
    setModal(true);
  };

  const row = ["FirstName", "LastName", "Email", "DOB", "File"];

  const displayTableHandler = () => {
    setUserTable(true);
    handleClose();
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
                  {/* <input
                  type="file"
                  className="btn btn-sm"
                  accept=".csv"
                  onChange={handleCsvFile}
                /> */}
                  <input
                    type="file"
                    className="btn btn-sm"
                    accept=".csv"
                    onChange={handleCsvFile}
                  />
                </a>

                {/* <button className="btn btn-secondary" onClick={exportToCsv}>
                <i className="material-icons">&#xE24D;</i>{" "}
                <span>Export to Excel</span>
              </button> */}
              </div>
            </div>
          </div>
          {/* <button onClick={proceedHandler}>Proceed</button> */}
          <Button variant="primary" onClick={handleShow} disabled={disable}>
            Proceed
          </Button>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Map Column
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {row.map((data, index) => (
                <div key={index}>
                  <label htmlFor={data}>{data}</label>
                  <select>
                    <option value="">Select {data}</option>
                    {csvData1[0] &&
                      Object.keys(csvData1[0]).map((key, index) => {
                        return (
                          <option key={index} value={key}>
                            {key}
                          </option>
                        );
                      })}
                  </select>
                </div>
              ))}
            </Modal.Body>

            {/* <Modal.Body>Last Name</Modal.Body>
        <Modal.Body>Email</Modal.Body>
        <Modal.Body>DOB</Modal.Body>
        <Modal.Body>Uploaded Data</Modal.Body> */}
            <Modal.Header></Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={displayTableHandler}>
                Display Data
              </Button>
            </Modal.Footer>
          </Modal>
          {/* {modal && <ModalTable />} */}
          {/* <table className="table table-striped table-hover">
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
          <tbody> */}
          {/* {users.map((user, index) => (
              <tr key={index}> */}
          {/* <td><input
                  type="checkbox"
                  name="user.firstName"
                  onChange={(e) => selectUserHandler(e)}
                /></td> */}
          {/* <td><input
                  type="checkbox"
                  name="user.firstName"
                 
                />&nbsp;{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.fileUpload}</td>
                <td>
                  <AiFillDelete
                  
                  ></AiFillDelete>
                </td>
              </tr>
            ))} */}
          {/* </tbody>
        </table> */}
        <div>{userTable && <DisplayData data={csvData1}/>}</div>
          <div className="clearfix">
            <div className="hint-text">
              {/* Showing <b>{users.length}</b> entries */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTable;

// <table className="table table-striped table-hover">
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>First Name</th>
//       <th>Last Name</th>
//       <th>Email address</th>
//       <th>Date of Birth</th>
//       <th>Uploaded File</th>
//       <th>Remove</th>
//     </tr>
//   </thead>
//   <tbody>
//     {users.map((user, index) => (
//       <tr key={index}>
//         <td>
//           <input type="checkbox" name="user.firstName" />
//           &nbsp;{index + 1}
//         </td>
//         <td>{user.firstName}</td>
//         <td>{user.lastName}</td>
//         <td>{user.email}</td>
//         <td>{user.dob}</td>
//         <td>{user.fileUpload}</td>
//         <td>
//           <AiFillDelete></AiFillDelete>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
