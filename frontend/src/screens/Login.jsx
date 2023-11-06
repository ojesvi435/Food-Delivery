import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [Credentials,setCredentials]=useState({email:"",Password:""})
  let navigate=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:Credentials.email,Password:Credentials.password}))
        const response= await fetch("http://localhost:5000/api/loginUser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "Accept":"application/json"
            },
            body:JSON.stringify({email:Credentials.email,Password:Credentials.password})
        })
        const json=await response.json();
        console.log(json);

        if(!json.success)
        {
            alert('Enter valid credentials')
        }
        else
        {
          localStorage.setItem("userEmail",Credentials.email)
          localStorage.setItem("authToken",json.authToken)
          console.log(localStorage.getItem("authToken"));
          navigate('/')
        }
    }
     const handleChange=(event)=>{
         setCredentials({...Credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
    <div className='container'>
    <form onSubmit={handlesubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"  name='email' value={Credentials.email} onChange={handleChange}  />
    <div id="emailHelp" className="form-text">We &apos; ll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={Credentials.password} onChange={handleChange}/>
    </div>
    <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to='/createUser' className='m-3 btn btn-danger'>Signup</Link>
    </form>
    </div>
    </div>
  )
}

export default Login
