import React from 'react'
import Counter from '@/landingpagesections/Counter'
import Hero from '@/landingpagesections/Hero'
import Vision from '@/landingpagesections/Vision'
import Essence from '@/landingpagesections/Essence'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Blogs from '@/landingpagesections/Blogs'
import NewsLetter from '@/landingpagesections/NewsLetter'
import Upload from '@/landingpagesections/Upload'
import Subscribers from '@/landingpagesections/Subscribers'
import SecondUpload from '@/landingpagesections/SecondUpload'
const page = () => {
  return (
    <>
      <ToastContainer />
      <Hero />
      <Vision />
      <Subscribers />
      <Counter />
      <SecondUpload/>
      {/* <Upload /> */}
      {/* <Blogs /> */}
      <Essence />
      <NewsLetter />


    </>
  )
}

export default page
