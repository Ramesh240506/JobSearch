import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div>
      
      <div className='job-main-login'>
            <div className='job-login'>
              <h1>JobFinder</h1>
                <div className='job-login-content'>
                  <h1>Welcome Back</h1>
                  <p>Please enter your details</p>
                  <label>Email address</label>
                  <input></input>
                  <label>Password</label>
                  <input></input>
                    <div className='job-login-btn'>
                      <button>Login</button>  
                    </div>
                  <p >Doesn't have an account? <span>Create New</span></p>
                  
                    <div className='job-login-or'>
                      <p>or</p>
                    </div>
                    <div className='job-google-login'>
                      <button>Sign in with Google</button>
                    </div>
                
                </div>
          </div>
      </div>
    
    </div>
  )
}

export default Login
