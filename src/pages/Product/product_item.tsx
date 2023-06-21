import React from 'react'

const product_item = () => {
  return (
    <div>
      {/* nothing valuable in here, we can add product and product/:id 
      to alter in route. But because back-end just support load all product 
      so i think don't need load by  */}
    </div>
  )
}

export default product_item

export const product_itemLoader = () => {
    return import(/* webpackChunkName: "product_item" */ './product_item')
}