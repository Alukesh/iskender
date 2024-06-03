
const CategoriesItemSub = ({ handleCategoryClick, category }) => {
  return (
    <Link
      draggable="false"
      to={`/catalog/${transliterate(category.name)}`}
      onClick={() => handleCategoryClick(category._id)}
    >
      <div className='categories-item' style={{ background: !category.img && '#F0F1F3' }}>
        <div className="categories-item-wrap">
          <h3 className="categories-item-wrap-title" title={category.name}>{category.name} ASD </h3>
          <p className=''>{itemCount} товаров</p>

        </div>
        {category.img ?
          <img style={{ objectFit: 'cover' }} src={String(category.img).replace('http://62.217.177.200:8080', baseURL)} alt={category.name} /> :
          <img
            style={{ objectFit: 'cover', }}
            src={BrokeImage}
            alt={category.name}
            loading='lazy'
          />
        }
      </div>
    </Link>
  )
}
export default CategoriesItemSub;