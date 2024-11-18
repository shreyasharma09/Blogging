import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import Firebase, {auth} from '../Firebase'
const Signup = () => {
  const[Obj,SetObj]=useState({})
  const [btndisable,setbtndisable]=useState(false)
  const navigate=useNavigate()
  const d =new Date()
  const date=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`

  function set(event){
    SetObj({...Obj,[event.target.name]:event.target.value,"Date":date})
  }

  function NameChange(event){
    const name = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    SetObj({...Obj,"Name":name});
    // console.log(Obj);
    
  }

  function EmailChange(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
}

  async function Submit(e){ 
    try {
      e.preventDefault()
      setbtndisable(true)
      if (!Obj.Name ||! Obj.Email || !Obj.Password || !Obj.ConfirmPassword) return alert("field is empty")
       
        var response=EmailChange(Obj.Email)
        if(!response) return alert("email address is invalid")
          if(Obj.Password!==Obj.ConfirmPassword) return alert("Password not match")

            const object={
              Name:Obj.Name,
              Email:Obj.Email
            }

            const result= await auth.createUserWithEmailAndPassword(Obj.Email,Obj.Password)
            // console.log(result.user.uid);
            
          SetObj({})
          
           Firebase.child("users").child(result.user.uid).set(object,err=>{
          if (err) return alert("something went wrong ,try again later")
            else return alert("account created successfully")
          
    })
        
    } catch (error) {
      console.log(error);
      alert("account already exist on this email")
    }
    finally{
      setbtndisable(false)
    }
    
  }

  function login (){
    navigate("/Login")
  }

  return (
    <div className="login-wrap">
  <div className="login-bg">
    <a  className="navbar-brand">
      <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
      <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
    </a>
  </div>
  <div className="login-content">
    <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
    <div className="login-form">
      <h3>Account SignUp</h3>
      <div className="alt-login">
        <a style={{width:"100%"}} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
          Google</a>    
      </div>
      <div className="text-center">
        <span className="or-text">OR</span>
      </div>
      <form action="#">
        <div className="form-group">
          <input type="text" value={Obj.Name?Obj.Name:""} onChange={NameChange} placeholder="Full Name" />
        </div>
        <div className="form-group">
          <input type="email" name='Email' value={Obj.Email?Obj.Email:""} onChange={set} placeholder="Email Address" />
        </div>
        <div className="form-group">
          <input type="password" name='Password' value={Obj.Password?Obj.Password:""} onChange={set} placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" name='ConfirmPassword' value={Obj.ConfirmPassword?Obj.ConfirmPassword:""} onChange={set} placeholder="Confirm Password" />
        </div>
        <button disabled={btndisable} type="submit" onClick={Submit} className="btn-two w-100 d-block">Create Account</button>
        <p className="login-text" onClick={login}>Already have an account?<a>Login</a></p>
      </form>
    </div>
  </div>
    </div>
  )
}

export default Signup