

import React from 'react'

const ProductId = async (params:{params:Promise<{ productid: string }>}) => {
  const {productid} =  await params.params
  console.log(productid);
  
  return (
    <div> This is my ProductId  {productid}
    </div>
  )
}

export default ProductId