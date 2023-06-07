import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useLoaderData, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'

const product = () => {
  return (
    <div>
      <Breadcrumbs />
    </div>
  )
}

export default product

export const productLoader = () => {
    return import(/* webpackChunkName: "product" */ './product')
}