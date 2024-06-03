import React from 'react'
import '../../styles/components/placeholders/categoryPlaceholder.scss'
import CategoryItemPlaceholder from './categoryItemPlaceholder';

const CategoryPlaceholder = ({itemsCount = 12}) => {
  const items = Array.from({ length: itemsCount })

  return (
    <div className="category_placeholder">
				{items.map((_, i) => {
					return <CategoryItemPlaceholder key={i}/>
				})}
    </div>
  )
}

export default CategoryPlaceholder