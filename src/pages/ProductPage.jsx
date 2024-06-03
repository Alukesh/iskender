import React from 'react';
import CatalogProducts from '../components/CatalogBlock/CatalogProducts';

function ProductPage() {
  return (
    <>
      <div className='product-page'>
        <CatalogProducts title='Новые товары' />
      </div>
    </>
  );
}

export default ProductPage;
