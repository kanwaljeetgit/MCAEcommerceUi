import {useState} from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { alertEmpty, alertError, alertSuccess, isEmpty } from '../utils/FormValidation';
import { useNavigate } from "react-router-dom";
import apiService from '../utils/ApiService';


function SignUp() {
  const navigate = useNavigate()
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setRegData({
      ...regData,
      [evt.target.name]: value
    });
  };

  const getServerRegisterResponse = async () => {
    const response = await apiService.post('/auth/register',JSON.stringify(regData)
    ).then(res => {
      if (res.status==200) {
        return res.data;
      } else {
        throw new Error(`Error ${res.status}`);
      }
    }).catch(error => {
      console.error('Error:', error.response.data.message);
      return error.response.data.message;
    });
    return response;
  };

  const signUp = async () => {
    let res = await getServerRegisterResponse();
    if(res.token){
      alertSuccess("Sign Up Successfully!!!");
      navigate('/');
      document.getElementById('signIn').click();
    }else{
      alertError(res);
    }
  };

  const validateInputs = () => {
    for (const key in regData) {
      if (isEmpty(regData[key])) {
        alertEmpty(key);
        return false;
      }
    }
    return true;
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if(!validateInputs()){
      return;
    }
    signUp();
    for (const key in regData) {
      setRegData({
        ...regData,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FacebookIcon/>
          </a>
          <a href="#" className="social">
            <GoogleIcon />
          </a>
          <a href="#" className="social">
            <LinkedInIcon />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="firstName"
          value={regData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={regData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="email"
          value={regData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={regData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
