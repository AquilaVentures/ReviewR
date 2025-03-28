import React from 'react'
import Counter from '@/landingpagesections/Counter'
import Hero from '@/landingpagesections/Hero'
import Vision from '@/landingpagesections/Vision'
import Essence from '@/landingpagesections/Essence'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Blogs from '@/landingpagesections/Blogs'
const page = () => {
  return (
    <>
      <ToastContainer />
      <Hero />
      <Vision />
      <Counter />
      <Blogs />
      <Essence />

    </>
  )
}

export default page