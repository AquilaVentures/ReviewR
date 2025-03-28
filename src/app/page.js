import React from 'react'
import Counter from '@/landingpagesections/Counter'
import Hero from '@/landingpagesections/Hero'
import Vision from '@/landingpagesections/Vision'
import Essence from '@/landingpagesections/Essence'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  return (
    <>
    <ToastContainer />
      <Hero />
      <Vision />
      <Counter />
      <Essence/>

    </>
  )
}

export default page