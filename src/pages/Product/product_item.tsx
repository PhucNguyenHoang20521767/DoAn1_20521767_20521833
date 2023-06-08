import React from 'react'

const product_item = () => {
  return (
    <div>product_item</div>
  )
}

export default product_item

export const product_itemLoader = () => {
    return import(/* webpackChunkName: "product_item" */ './product_item')
}