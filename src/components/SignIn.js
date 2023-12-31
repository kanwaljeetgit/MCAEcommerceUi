import React, { useEffect } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { isEmpty, alertEmpty, alertError } from "../utils/FormValidation.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate()
  const [userCred, setUserCred] = React.useState({
    email:"",
    password:""
  });


  const handleChange = evt => {
    const value = evt.target.value;
    setUserCred({
      ...userCred,
      [evt.target.name]: value
    });
  };

  const validateInputs = () => {
    const { email, password } = userCred;
    if (isEmpty(email)) {
      alertEmpty('email');
      return false;
    }
    if (isEmpty(password)) {
      alertEmpty('password');
      return false;
    }
    return true;
  };

  const getServerAuthResponse = async () => {
    const response = await fetch('http://localhost:8080/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCred),
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error with status ${res.status}`);
      }
    }).catch(error => {
      console.error('Error:', error.message);
      return error.message;
    });
    return response;
  };

  const signIn = async () => {
    const { email, password } = userCred;
    let res = await getServerAuthResponse();
    if(res.token){
      localStorage.setItem('token',res.token);
      navigate('/home');
    }else{
      alertError(res);
    }
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if(!validateInputs()){
      return
    }
    signIn()
    for (const key in userCred) {
      setUserCred({
        ...userCred,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FacebookIcon />
          </a>
          <a href="#" className="social">
            <GoogleIcon />
          </a>
          <a href="#" className="social">
            <LinkedInIcon />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          value={setUserCred.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={setUserCred.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;