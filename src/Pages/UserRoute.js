import React, { useEffect, useState } from 'react'
import UserContext from './Context/UserContext'
import Firebase from '../Firebase'
import { Outlet } from 'react-router-dom'

const UserRoute = () => {
    const [state, setstate] = useState([])
    const [images, setimages] = useState([])
    const [loading ,setloading]=useState(false)
    const[users,setusers]=useState({})
    useEffect(() => {
        setloading(true)
        Firebase.child("Blogs").on("value", function (snap) {
            if (snap.val()) {
                let array = []
                Object.keys(snap.val()).map((user) => {
                    Object.keys(snap.val()[user]).map((key) => {
                        const object = snap.val()[user][key]
                        object.User = user                             //key named User created
                        array.push(object);                         //array m sare blog h
                    })
                })
                array.sort((a, b) => b.Date - a.Date)                   //latest blogs nikal rhe h 
                const newarray = array.slice(0, 12)                    //top 12 blogs
                setstate(newarray)
                let resultingarray = []
                newarray.map((obj) => {
                    if (obj.Images) {
                        resultingarray = [...resultingarray, ...obj.Images]
                    }
                })
                const myarray = resultingarray.slice(0, 15)             // 15 images utha li
                setimages(myarray)
            }
            else {
                setstate([])
                setimages([])
            }
        })
        Firebase.child("users").on("value",function(snap){
            if (snap.val()) return setusers(snap.val())
                else return setusers({})
        })
        setTimeout(()=>setloading(false),2000)
    }, [])
    return (
        <UserContext.Provider value={{ "fetchlatestblogs": state, "fetchlatestimages": images , "users":users, "loading":loading }}>
            <Outlet />
        </UserContext.Provider>
    )
}

export default UserRoute