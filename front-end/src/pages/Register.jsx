import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Header from "../components/Header"
import Logo from "../components/Logo"
import Footer from "../components/Footer"



function Register(){
    
  const navigate = useNavigate();
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
    
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });  
    
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);  

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3 || username.length >25 ) {
      toast.error(
        "Username should be greater than 3 and less than 25 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit =  async (event) => {
    
    event.preventDefault();
    
    if (handleValidation()) {
      
      const { email, username, password } = values;
      
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      

      if (data.status === false) {
      
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

    
    return(<div>
        <Header />
<section className=" gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card text-white" style={{borderRadius: "1rem" , backgroundColor:"#f5ba13"}}>
          <div className="card-body p-5 text-center">

            <div className=" pb-5" >
              <Logo/>
              <p className="text-white-50" style={{marginBottom:"0.5rem" , marginTop:"1rem"}}>Please enter your details!</p>

              <div className="form-outline form-white mb-4">
                <input 
                type="text" 
                id="typeEmailX" 
                className="form-control form-control-lg" 
                name="username"
                value={values.username}
                onChange={(e) => handleChange(e)}
                placeholder="Full Name" />
              </div>
              <div className="form-outline form-white mb-4">
                <input 
                type="email" 
                id="typeEmailX" 
                className="form-control form-control-lg" 
                name="email"
                value={values.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email" />
              </div>
              <div className="form-outline form-white mb-4">
                <input 
                type="password" 
                id="typePasswordX" 
                className="form-control form-control-lg" 
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
                placeholder="Password"/>
              </div>
              <div className="form-outline form-white mb-4">
                <input 
                type="password" 
                id="typePasswordX" 
                className="form-control form-control-lg" 
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={(e) => handleChange(e)}
                placeholder="Re-enter Password" />
              </div>

             

              <button className="btn btn-light btn-lg px-5" type="submit" onClick={(event) => handleSubmit(event)}>Register</button>

              

            </div>

            <div>
              <p className="mb-0">Already have an account?<a href="/login" className="text-white-50 fw-bold">Sign In</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<ToastContainer />
        <Footer />
</div>

    );
}

export default Register;