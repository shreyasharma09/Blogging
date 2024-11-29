import React, { useEffect, useState } from 'react'
import UserContext from './Context/UserContext'
import Firebase from '../Firebase'
import { Outlet } from 'react-router-dom'

const UserRoute = () => {
    const [state, setstate] = useState([])
    const [images, setimages] = useState([])
    useEffect(() => {
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
                const newarray = array.slice(0, 10)                    //top 10 blogs
                setstate(newarray)
                let resultingarray = []
                newarray.map((obj) => {
                    if (obj.Images) {
                        resultingarray = [...resultingarray, ...obj.Images]
                    }
                })
                const myarray = resultingarray.slice(0, 15)             // 16 images utha li
                setimages(myarray)
            }
            else {
                setstate([])
                setimages([])
            }
        })
    }, [])
    return (
        <UserContext.Provider value={{ "fetchlatestblogs": state, "fetchlatestimages": images }}>
            <Outlet />
        </UserContext.Provider>
    )
}

export default UserRoute