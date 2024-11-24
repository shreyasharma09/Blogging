import React from 'react'
import Header from '../Components/Header'
import BlogDetailComp from '../Components/BlogComponents/BlogDetailComp'
import Footer from '../Components/Footer'

const Blogdetails = () => {
  return (
    <div>
        <Header blogdetails="active"/>
        <BlogDetailComp/>
        <Footer/>
    </div>
  )
}

export default Blogdetails