import React from 'react'
import Header from '../Components/Header'
import TermsComp from '../Components/TermsAndCondition/TermsComp'
import Footer from '../Components/Footer'

const TermsandCondition = () => {
  return (
    <div>
        <Header termsandcondition="active"/>
        <TermsComp/>
        <Footer/>
    </div>
  )
}

export default TermsandCondition