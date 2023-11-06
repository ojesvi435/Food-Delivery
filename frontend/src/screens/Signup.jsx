import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'


export default function Signup(){
    const [Credentials,setCredentials]=useState({name:"",email:"",Password:"",location:""})

    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:Credentials.name,email:Credentials.email,Password:Credentials.password,location:Credentials.location}))
        const response= await fetch("http://localhost:5000/api/createUser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "Accept":"application/json"
            },
            body:JSON.stringify({name:Credentials.name,email:Credentials.email,Password:Credentials.password,location:Credentials.location})
        })
        const json=await response.json();
        console.log(json);

        if(!json.success)
        {
            alert('Enter valid credentials')
        }
    }
     const handleChange=(event)=>{
         setCredentials({...Credentials,[event.target.name]:event.target.value})
    }
    
    return(
        <>
        <div className='container'>
    <form onSubmit={handlesubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInput" className="form-label" >Username</label>
    <input type="text" className="form-control" name='name' value={Credentials.name} onChange={handleChange} />
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"  name='email' value={Credentials.email} onChange={handleChange}  />
    <div id="emailHelp" className="form-text">We &apos; ll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={Credentials.password} onChange={handleChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="example" className="form-label" >Location</label>
    <input type="text" className="form-control" id="exampleInput" name='location' value={Credentials.location} onChange={handleChange} />
    </div>
    <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
    </form>
    </div>
    </>
    )
}