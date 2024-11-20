import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddBlog from './AdminPages/AddBlog'
import BlogShow from './AdminPages/BlogShow'
import MyAccount from './AdminPages/MyAccount'
import AdminBlogDetail from './AdminPages/AdminBlogDetail'
import AdminBlogContext from './Context/AdminBlogContext'
import Firebase from '../Firebase'

const AdminRoutes = () => {
    const[data,setdata]=useState(null)
    const[loader,setloader]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        setloader(true)
        const user=JSON.parse(localStorage.getItem("Users"))
        if(!user){
            alert("Unauthorised user")
            window.history.replaceState(null,null,"/Login")
            return navigate("/",{replace:true})
        }
        Firebase.child("Blogs").child(user).on("value",function (snap) {
            if(snap.val()) return setdata(snap.val())
            else return setdata(null)
        })
        setloader(false)
    },[])
  return (
    <div>
        <AdminBlogContext.Provider value={{"fetchblogs":data,"loader":loader}}>
        <Routes>
        <Route path='AddBlog' element={<AddBlog />} />
          <Route path='/' element={<BlogShow />} />
          <Route path='AdminBlogDetail' element={<AdminBlogDetail />} />
          <Route path='MyAccount' element={<MyAccount />} />
        </Routes>
        </AdminBlogContext.Provider>
    </div>
  )
}

export default AdminRoutes