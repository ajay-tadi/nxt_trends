import { useState} from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// username: rahul
// password: rahul@2021 

const LoginForm = () => {
  
  const userObj = {username:"rahul",password:"rahul@2021"}
  const [userDetailsObj,setUserDetails] = useState(userObj);
  const [errorObj,setError] = useState({errorState:false,errorM:''})
  const {errorState,errorM} = errorObj
  const {username,password} = userDetailsObj;


  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate replace to="/" />
    }

  const onChangeUsername = event => {
    setUserDetails({...userDetailsObj,'username':event.target.value})
    
  }

  const onChangePassword = event => {
    setUserDetails({...userDetailsObj,'password':event.target.value})
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    console.log('worked')
    navigate("/")
    
  }

  const onSubmitFailure = errorMsg => {
    setError({errorState:true,errorM:errorMsg})
  }

  const submitForm = async event => {
    event.preventDefault()
   
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',   
      body: JSON.stringify(userDetails),
    }
    
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

 


    return (
      <div className="login-form-container">
        
        <form className="form-container" >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
         <input
          type="text"
          id="username"
          className="password-input-filed"
          value={username}
          onChange={onChangeUsername}
        />
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={onChangePassword}
        />
          <button type="submit" className="login-button" onClick={submitForm}>
            Login
          </button>
          {errorState && <p className="error-message">*{errorM}</p>}
        </form>
      </div>
    )
  
}

export default LoginForm