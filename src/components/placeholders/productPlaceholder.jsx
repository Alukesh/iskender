import React from 'react';
import '../../styles/components/placeholders/productPlaceholder.scss';
import ProductItemPlaceholder from './productItemPlaceholder';

const ProductPlaceholder = ({ itemsCount = 1 }) => {
  const items = Array.from({ length: itemsCount })

  return (
    // <div className='product_placeholder'>
    <>
      {items.map((_, i) => {
        return <ProductItemPlaceholder key={i} />
      })}
    </>
    // </div>
  )
}

export default ProductPlaceholder;