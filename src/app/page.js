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
const page = () => {
  return (
    <>
      <ToastContainer />
      <Hero />
      <Vision />
      <Counter />

      <Blogs />
      <Essence />
      <Upload />
      <NewsLetter />

    </>
  )
}

export default page