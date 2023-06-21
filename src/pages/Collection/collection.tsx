import React from 'react'
import ScrollToTop from '@/utils/scroll_top'
import { Link, useLoaderData, useParams } from "react-router-dom"

const collection = () => {
  return (
    <>
      <ScrollToTop />
      <h1>aknjjf</h1>
    </>
  )
}

export default collection

export const collectionLoader = async () => {
  const res = await fetch('http://localhost:4000/careers')

  return {
    props: {},
  }
}