import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import app from '../../Hook/firebaseConfig';
import Swal from "sweetalert2";
import useFirebase from "../../Hook/useFirebase";

const auth = getAuth(app);

const Registration = ({ user, setUser }) => {
  const [error, setError] = useState('');
  const [isDisable, setIsDisable] = useState(true);


  const { handleGoogleSign } = useFirebase();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Your password will be 2 Uppercase.');
      return;
    }
    if (password.length < 6) {
      setError('Your password will must be 6 characters');
      return;
    }
    if (!/(?=.*[!#$%&?"])/.test(password)) {
      setError('Your need a Special characters.');
      return
    }
    setError('')
    // console.log(name, email, password);

    if ((name, email, password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // Signed in 
          const userInfo = result.user;
          setUser(userInfo);
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
          form.reset();
          // console.log(userInfo);
          /* ----------------------------
                        updateProfile
           ------------------------------ */
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            console.error(error)
            // ...
          });
          /* --------------------------
          sendEmailVerification
          ------------------------------ */
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              // ...
            });
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
          // ..
        });
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(user);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);


  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <div className="input-box">
            <p className="text-danger">{error}</p>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                className="form-control p-3 m-2"
                type="text"
                placeholder="Enter your name"
                required
              />
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
                <Link to="/login" className="text-decoration-none">
                  <small className="text-danger link">
                    already have an account? please login
                  </small>
                </Link>
              </p>
              <input
                onClick={() => setIsDisable(!isDisable)}
                className="p-2" type="checkbox" />{" "}
              <span className="mb-3">accept term & condition</span>
              <br />
              <button
                type="submit"
                className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
                disabled={isDisable}
              >
                Register
              </button>
            </form>
          </div>
          <button
            onClick={handleGoogleSign}
            className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p
              className="fw-bold">Google SignIn</p>
          </button>
        </div>
      </div>
    </div >
  );
};

export default Registration;
