import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import app from '../../Hook/firebaseConfig';
import useFirebase from "../../Hook/useFirebase";
import ResetPassword from "../ResetPassword/ResetPassword";

const auth = getAuth(app);

const Login = ({ user, setUser }) => {
  const [modalShow, setModalShow] = React.useState(false);

  const { handleGoogleSign } = useFirebase();

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    /* ------------------------
    signInWithEmailAndPassword
    --------------------------- */

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in 
        const userInfo = result.user;
        console.log(userInfo);
        form.reset();
        setUser(userInfo)
        Swal.fire(
          'Good job!',
          'Login Success!'
        )
      })
      .catch((error) => {
        console.error(error)
      });
  }

  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/0hLvWvP/undraw-Login-re-4vu2.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <p>{"error"}</p>
          <form onSubmit={handleLogin}
            className="input-box">
            <input
              name="email"
              className="form-control p-3 m-2"
              type="email"
              placeholder="Email"
              required
            />
            <input
              name="password"
              className="form-control p-3 m-2"
              type="password"
              placeholder="password"
              required
            />
            <p className="link ">
              <Link to="/registration" className="text-decoration-none">
                <small className="text-danger link">
                  are you new? please register
                </small>
              </Link>
              <span onClick={() => setModalShow(true)} role="button" className="ms-4 text-primary cursor-pointer">
                Forget Password?
              </span>
            </p>
            <input className="p-2" type="checkbox" />{" "}
            <span className="mb-3 ">remember me </span>
            <br />
            <button className="btn btn-info p-3 w-50 mt-3 fw-bold text-white">
              Login
            </button>
          </form>
          <button className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p
              onClick={handleGoogleSign}
              className="fw-bold">Google SignIn</p>
          </button>
          <ResetPassword
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
