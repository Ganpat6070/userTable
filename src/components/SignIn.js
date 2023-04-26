import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const navigate = useNavigate();
  const userCollection = collection(db,"users")

  const signindata = {
    email,
    password,
  };

  const SignInHandler = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError(
        <span className="errorMessage">
          Email and password are mandatory and must be valid
        </span>
      );
      return;
    }
  
    console.log(signindata);
    signInFunction(signindata);
  };
  

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const EmailHandler = (event) => {
    const email = event.target.value;

    if (!isEmailValid(email)) {
      setError(
        <span className="errorMessage">Please enter a valid email address</span>
      );
    } else {
      setError("");
    }
    setEmail(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const PasswordHandler = (event) => {
    const password = event.target.value;
    if (!isPasswordValid(password)) {
      setError(
        <span className="errorMessage">
          Password should have minimum length of 8\nand at least one uppercase
          letter
        </span>
      );
    } else {
      setError("");
    }
    setPassword(password);
  };

  const signInFunction = async (values) => {
    const data = await getDocs(userCollection);
    console.log(data);
    const matchedUser = data.docs.find(
      (doc) => doc.data().email === values.email
    );
    if (matchedUser) {
      console.log("User logged in successfully");
      navigate("/usertable");
    } else {
      console.log("User not found in Firestore");
      setError1('User not found in Firestore');
    }
  };
  
  return (
    <div className="h-100 d-flex align-item-center justify-content-center">
      <form className="mx-5 borderStyle" onSubmit={SignInHandler}>
        <h3 className="text-center">Sign In</h3>
        <div className="mx-5 signup">
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={EmailHandler}
            />

            {<p className="errorStyle">{error ? error : error1}</p>}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={PasswordHandler}
            />
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />

            <label className="custom-control-label" htmlFor="customCheck1">
              &nbsp; Remember me
            </label>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={signInFunction}
            >
              Sign In
            </button>
            <p className="forgot-password text-right">
              Don't have Account <Link to="/signUp">Sign Up?</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
