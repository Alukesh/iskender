import { baseURL } from '../../services/api';
import BrokeImage from "../../components/icons/brokeImage.svg"
import { Link } from 'react-router-dom';
import transliterate from '../../transliteration';

const mainCategoryCunts = {
  'Ванны': 15,
  'Водонагреватели': 59,
  'Душевые': 34,
  'Инструменты': 12,
  'Конвекторы': 1,
  'Led зеркала': 6,
  'Полотенцесушители': 13,
  'Радиаторы': 3,
  'Сифоны и гофры': 6,
  'Комплектующие': 102,
  'Трубы и фитинги': 170,
  'Экран для ванны': 3,
  'Унитазы': 85,
  'Смесители': 7,
  'Умывальники': 205,
  'Кухонные вытяжки': 5,
  'Столешницы из керамогранита': 4,
  'Мебель крашенная': 75,
  'Мебель стандарт': 383,
}
const CategoriesItemMain = ({ category, handleCategoryClick }) => {
  return (

    mainCategoryCunts[category.name] ? <>
      <Link
        draggable="false"
        to={`/catalog/${transliterate(category.name)}`}
        onClick={() => handleCategoryClick(category._id)}
      >
        <div className='categories-item' style={{ background: !category.img && '#F0F1F3' }}>
          <div className="categories-item-wrap">
            <h3 className="categories-item-wrap-title" title={category.name}>{category.name} ASD </h3>
            <p className=''>{mainCategoryCunts[category.name] || 0} товаров</p>

          </div>
          {category.img ?
            <img src={String(category.img).replace('http://62.217.177.200:8080', baseURL)} alt={category.name} /> :
            <img
              style={{ objectFit: 'cover', }}
              src={BrokeImage}
              alt={category.name}
              loading='lazy'
            />
          }
        </div>
      </Link>
    </> : <></>
  )
};

export default CategoriesItemMain;
