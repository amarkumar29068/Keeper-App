import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import Header from "../components/Header"
import Logo from "../components/Logo"
import Footer from "../components/Footer"

function Login(){

  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };







return(
<div>
<Header />
<section className=" gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card text-white" style={{borderRadius: "1rem" , backgroundColor:"#f5ba13"}}>
          <div className="card-body p-5 text-center">

            <div className=" pb-5" >
              <Logo/>
              <p className="text-white-50" style={{marginBottom:"0.5rem" , marginTop:"1rem"}}>Please enter your email and password!</p>

              <div className="form-outline form-white mb-4">
                <input 
                type="email" 
                id="typeEmailX" 
                className="form-control form-control-lg" 
                placeholder="Email" 
                name="username"
                value={values.username}
                onChange={(e) => handleChange(e)}  
                />
                
              </div>

              <div className="form-outline form-white mb-4">
                <input 
                type="password" 
                id="typePasswordX" 
                className="form-control form-control-lg" 
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
                />
     
              </div>

              <button 
              className="btn btn-light btn-lg px-5" 
              type="submit" 
              onClick={(event) => handleSubmit(event)}
              >Login</button>

            </div>

            <div>
              <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer />
<ToastContainer />
</div>
);
}

export default Login;