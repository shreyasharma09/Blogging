import React, { useRef, useState } from 'react'
import Firebase, { storage } from '../../Firebase'
import { useNavigate } from 'react-router-dom'

const AddBlogComp = () => {

    const [obj, setobj] = useState({})
    const [inputs, setinputs] = useState([])
    const [headingimage, setheadingimage] = useState(null)
    const [images, setimages] = useState([])
    const [imageserror, setimageserror] = useState(null)
    const [btndisable, setbtndisable] = useState(false)
    const[loader,setloader]=useState(false)
    const image = useRef()
    const multipleimages = useRef()
    const navigate=useNavigate()

    const set = (event) => {
        setobj({ ...obj, [event.target.name]: event.target.value,"Date":Date.now() })
    }
    const Create = () => {
        if (inputs.length < 5) {
            setinputs(inputs => [...inputs, { id: inputs.length + 1 }])
        }
        else {
            alert("no more inputs")
        }
    }
    // console.log(inputs);
    const radiocheck = (event) => {
        setobj({ ...obj, "Status": event.target.id });

    }
    // console.log(obj);
    const set1 = (event, Obj, index) => {
        const result = ({ ...Obj, [event.target.name]: event.target.value });
        //    const response=inputs.filter(function(object){
        //     return object.id==Obj.id
        //    }) 
        inputs.splice(index, 1, result)

        setinputs([...inputs])
        // console.log(inputs);

    }
    const upload = (event) => {
        const file = event.target.files[0]
        if (!file) return alert("Image is not uploaded yet")
        const ext = file.type.split("/")
        if (ext[0] !== "image") return alert("only image can be uploaded")
        if (ext[1] === "png" || ext[1] === "jpg" || ext[1] === "jpeg" || ext[1] === "PNG" || ext[1] === "JPG") {
            return setheadingimage(file)
        }
        return alert("only png,jpg,jpeg images can be uploaded")
    }
    // console.log(headingimage);
    const uploads = (event) => {
        const file = event.target.files                     //obj of obj p for ya forin loop chlta h 
        if (!file) return alert("no image selected")

        if (file.length > 10) return alert("only 10 images are allowed to uploaded")

        let status = images
        let count = 0
        for (let i = 0; i < file.length; i++) {
            if (status.length > 9) {
                alert("only 10 images are allowed to uploaded")
                break;
            }
            const ext = file[i].type.split("/")
            if (ext[0] !== "image") {
                count++
            }
            else {
                if (ext[1] === "png" || ext[1] === "jpg" || ext[1] === "jpeg" || ext[1] === "PNG") {
                    status.push(file[i])
                }
                else {
                    count++
                }
            }
        }
        setimages([...status])
        setimageserror(count)
        //  console.log(images,imageserror);

    }
    const Remove = (index) => {
        images.splice(index, 1)
        setimages([...images])
    }
    const Submit = async (e) => {
    e.preventDefault()
        try {
            setbtndisable(true)
            setloader(true)
            if (!obj.Title || !obj.Author || !obj.Description || !obj.Category || !obj.Heading || !obj.Tags || !obj.Status) return alert("Field is empty")
            if (!headingimage) return alert("Upload your image")

            let count = 0
            for (let i = 0; i < inputs.length; i++) {
                if (!inputs[i].Sub_Heading || !inputs[i].Sub_Heading_Description) {
                    count++
                }
            }
            if (count > 0) return alert("Some fields are empty in Sub heading part")


            const user=JSON.parse(localStorage.getItem("Users"))
            if(!user){
                alert("Unauthorised user")
                window.history.replaceState(null,null,"/Login")
                navigate("/",{replace:true})
            }


            //    img=>storage text(obj)=>database              url of img in storage will be store in realtime to show the img andc collect all in one place

            const fileRef = storage.child(Date.now()+headingimage.name)
            await fileRef.put(headingimage)
            const url = await fileRef.getDownloadURL()
            const path = fileRef.fullPath                    //to delete the img 
            const headobject = { url, path }

            let mydata = { ...obj, "HeadingImage": headobject, "SubHeadingsData": inputs }

            //additional imgs (optional)
            if (images.length > 0) {
                let myarray=[]
                for (let j = 0; j < images.length; j++) {
                  const fileRefs=storage.child(Date.now()+images[j].name)  
                  await fileRefs.put(images[j]) 
                  const urls=await fileRefs.getDownloadURL()
                  const paths=fileRefs.fullPath
                  myarray.push({urls,paths})
                }
                mydata={...mydata,"Images":myarray}
            }

            Firebase.child("Blogs").child(user).push(mydata, err => {
                if (err) return alert("Error Ocurred in saving ")
                else return alert("Blog Uploaded")
            })
            setTimeout(() =>navigate("/Blogs"), 1500);

        } catch (error) {
            return alert("Something went wrong ,Try again later")
        }
        finally {
                setobj({})
                setheadingimage(null)
                setimages([])
                setinputs([])
                setbtndisable(false)
                setloader(false)
        }

    }

    return (
        <div>
            {
                loader&&<div className='preloaders'><div className='loaders'></div></div>
            }
            <div className="checkout-wrap ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-7 col-lg-7">
                            <form action="#" className="checkout-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3 className="checkout-box-title">Add your Blogs</h3>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Title" onChange={set} value={obj.Title ? obj.Title : ""} placeholder=" Enter your Title" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Author" onChange={set} value={obj.Author ? obj.Author : ""} placeholder="Enter your Author Name" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="text" name="Heading" onChange={set} value={obj.Heading ? obj.Heading : ""} placeholder="Enter your Heading" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea name='Description' onChange={set} value={obj.Description ? obj.Description : ""} placeholder='Enter your Description'></textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Category" onChange={set} value={obj.Category ? obj.Category : ""} placeholder="Enter your Category" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout-box" style={{ backgroundColor: 'transparent', padding: "0px" }}>
                                            <div className="checkout-details" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                                <div className="bill-details">
                                                    <div style={{ display: "flex", flexWrap: "nowrap" }} className="select-payment-method mt-20">
                                                        <div>
                                                            <span style={{ fontSize: "20px" }}>Status:</span>
                                                        </div>
                                                        <div>
                                                            <input onClick={radiocheck} type="radio" readOnly={true} checked={obj.Status==="Active"?true:false} id="Active" name="Status" />
                                                            <label htmlFor='Active'>Active</label>
                                                        </div>
                                                        <div>
                                                            <input onClick={radiocheck} type="radio" readOnly={true} checked={obj.Status==="In-Active"?true:false} id="In-Active" name="Status" />
                                                            <label htmlFor='In-Active'>In-Active</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="Tags" onChange={set} value={obj.Tags ? obj.Tags : ""} placeholder="Enter your Tags . Separated b y comma(,)" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <a onClick={Create} className="btn-two w-100 d-block">Create Sub Heading<i className="flaticon-right-arrow" /></a>
                                        </div>
                                    </div>
                                    {
                                        inputs.map(function (input, index) {
                                            return (
                                                <div className='row' key={index}>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => set1(e, input, index)} name="Sub_Heading" placeholder={`Sub Heading -${input.id}`} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="text" onChange={(e) => set1(e, input, index)} name="Sub_Heading_Description" placeholder={`Sub Heading Description -${input.id}`} required />
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                    <div className="col-lg-12 mt-4">
                                        <div className="form-group mb-0">
                                            <button type="submit" disabled={btndisable} className="btn-one" onClick={Submit}>Submit<i className="flaticon-right-arrow" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-xxl-4 col-xl-5 col-lg-5">
                            <div className="sidebar">
                                <div className="checkout-box">
                                    <h2 className="cart-box-title">Heading Image</h2>
                                    <div className="cart-total">
                                        <div className="cart-total-wrap">
                                            <div className="cart-total-item">
                                                <img className='img-thumbnail' height={"100%"} width={"100%"} src={headingimage ? URL.createObjectURL(headingimage) : "/assets/img/download.jpg"} alt=''></img>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type='file' onChange={upload} accept='image/*' hidden ref={image}></input>
                                                    <a className="btn-two w-100 d-block" onClick={() => image.current.click()} >Upload Heading Image<i className="flaticon-right-arrow" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-box container">
                                    <h4 className="cart-box-title" >Upload more Images</h4>
                                    <div className="checkout-details">
                                        {
                                            images.map(function (Obj, index) {
                                                return (
                                                    <div className='myimages' key={index}>
                                                        <img src={Obj ? URL.createObjectURL(Obj) : "/assets/img/download.jpg"} alt=''></img>
                                                        <i onClick={() => Remove(index)}>&times;</i>
                                                    </div>
                                                )
                                            })
                                        }
                                        <br></br> <br></br> <br></br><br></br><br></br><br></br><br></br><br></br>
                                        {
                                            imageserror ? <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>{imageserror + "  images don't support the requirement type"}</p> : ''
                                        }
                                        <div className="bill-details">
                                            <div className="checkout-footer mt-4">
                                                <input type='file' hidden ref={multipleimages} multiple={true} onChange={uploads} accept='image/*'></input>
                                                <button type="button" onClick={() => multipleimages.current.click()} className="btn-one d-block w-100 mt-10">Upload more Images<i className="flaticon-right-arrow" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBlogComp