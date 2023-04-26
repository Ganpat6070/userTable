import React, { useState } from "react";
import "./SignUP.css";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [signUPData, setSignUPData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    fileUpload: "",
  });

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [submitting, setSubmitting] = useState(true);

  const userCollection = collection(db, "users");

  const changeHandler = (e) => {
    setSignUPData((prevData) => ({
      ...prevData,

      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "firstName") {
      setError("");
    }
    if (e.target.name === "lastName") {
      setError2("");
    }
    if (e.target.name === "email") {
      setError3("");
    }
    if (e.target.name === "password") {
      setError4("");
    }
    if (e.target.name === "dob") {
      setError5("");
    }
    if (e.target.name === "fileUpload") {
      setError6("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!signUPData.firstName) {
      setError("First Name must required");
      return;
    }
    if (!signUPData.lastName) {
      setError2("Last Name must required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUPData.email)) {
      setError3("Invalid email format");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(signUPData.password)) {
      setError4("Password must be 6 characters long and one UpperCase");
      return;
    }
    if (!signUPData.dob) {
      setError5("Please select DOB");
      return;
    }
    if (!signUPData.fileUpload) {
      setError6("You need to Upload a file");
      return;
    } else {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      try {
        // Add a new document with user data to the 'users' collection in Firestore
        await addDoc(userCollection, signUPData);
        // alert("User added successfully!");
        toast.success("User added successfully!");
      } catch (error) {
        console.error("Error adding user: ", error);
        // alert("Error adding user: " + error.message);
        toast.error("Error adding user: " + error.message);
      } finally {
        setSubmitting(false);
      }
      console.log(signUPData);
      setTimeout(() => {
        navigate("/signin");
      }, 1500); 
    }
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <form className="mx-5 borderStyle" onSubmit={submitHandler}>
        <ToastContainer />
        <div className="mx-5 signup">
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              value={signUPData.firstName}
              onChange={(e) => changeHandler(e)}
            />
            {<span>{error}</span>}
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastName"
              value={signUPData.lastName}
              onChange={(e) => changeHandler(e)}
            />
            {<span>{error2}</span>}
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={signUPData.email}
              onChange={(e) => changeHandler(e)}
            />
            {error3 && <span className="error">{error3}</span>}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={signUPData.password}
              onChange={(e) => changeHandler(e)}
            />
            {<span>{error4}</span>}
          </div>

          <div className="mb-3">
            <label>DOB</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter DOB"
              name="dob"
              value={signUPData.dob}
              onChange={(e) => changeHandler(e)}
            />
            {<span>{error5}</span>}
          </div>
          <div className="mb-3">
            <label>Upload File</label>
            <input
              type="file"
              className="form-control"
              name="fileUpload"
              accept=".csv"
              value={signUPData.fileUpload}
              onChange={(e) => changeHandler(e)}
            />
            {<span>{error6}</span>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/signin">Sign-In ?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
