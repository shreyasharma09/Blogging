import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {auth} from '../Firebase'

const Login = () => {
    const [obj,setobj]=useState({})
    const[btndisable,setbtndisable]=useState(false)
    const navigate=useNavigate()

    const set=(event)=>{
        setobj({...obj,[event.target.name]:event.target.value})
    }

    function EmailChange(email){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email)
    }

    const submit=async(e)=>{
        try {
            e.preventDefault()
            setbtndisable(true)

            if(!obj.Email || !obj.Password) return alert("field is empty")

            const response=EmailChange(obj.Email)
            if(!response) return alert("email address is invalid")

                const result=await auth.signInWithEmailAndPassword(obj.Email,obj.Password)
                localStorage.setItem("users",JSON.stringify(result.user.uid))
                setobj({})
                navigate("/Admin")


        } catch (error) {
            return alert("invalid credentials")
        }
        finally{
            setbtndisable(false)
        }
       
    }

    return (
        <div className="login-wrap">
                <div className="login-bg">
                    <a href="index.html" className="navbar-brand">
                        <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
                        <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
                    </a>
                </div>
                <div className="login-content">
                    <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
                    <div className="login-form">
                        <h3>Welcome Back</h3>
                        <div className="alt-login">
                            <a style={{width:"100%"}} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
                                Google</a>
                        </div>
                        <div className="text-center">
                            <span className="or-text">OR</span>
                        </div>
                        <form action="#">
                            <div className="form-group">
                                <input type="email" name='Email' onChange={set} value={obj.Email?obj.Email:""} placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <input type="password" name='Password' onChange={set} value={obj.Password?obj.Password:""} placeholder="Password" />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-check checkbox">
                                        <input className="form-check-input" type="checkbox" id="test_2" />
                                        <label className="form-check-label" htmlFor="test_2">
                                            Stay Logged In?
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6 text-end">
                                    <a href="#">Forgot Password</a>
                                </div>
                            </div>
                            <button type="submit" onClick={submit} disabled={btndisable} className="btn-two w-100 d-block">Login</button>
                            <p className="login-text">Don't have an account?<a href="signup.html">Sign Up</a></p>
                        </form>
                    </div>
                </div>
        </div>
    )
}
export default Login