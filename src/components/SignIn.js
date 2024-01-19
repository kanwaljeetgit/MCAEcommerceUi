import React, { useCallback } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { isEmpty, alertEmpty, alertError } from "../utils/FormValidation.js";
import { useNavigate } from "react-router-dom";
import apiService from '../utils/ApiService';
import { loadCart, loadCartFromServer } from "../redux/CartSlice.js";
import { useDispatch } from "react-redux";

function SignIn() {
  const navigate = useNavigate()
  const [userCred, setUserCred] = React.useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();

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
    const response = await apiService.post('/auth/authenticate', JSON.stringify(userCred)
    ).then(res => {
      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error(`Error with status ${res.status}`);
      }
    }).catch(error => {
      console.error('Error:', error.message);
      return error.message;
    });
    return response;
  };

  const fetchCartData = async () =>{
    const response = await apiService.get('/cart').catch((error) => {
      console.error('No Data Found:', error);
      return undefined;
    });
    if(response){
      dispatch(loadCart(response.data.cartData));
    }
    return Promise.resolve(response);
  }

  const signIn = async () => {
    const { email, password } = userCred;
    let res = await getServerAuthResponse();
    if (res.token) {
      sessionStorage.setItem('token', res.token);
      fetchCartData().then((res)=>{
        navigate('/home');
      });
    } else {
      alertError(res);
    }
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if (!validateInputs()) {
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