import styles from './ProductDetails.module.scss'
import { ReactComponent as BrokeImage } from "../../../components/icons/brokeImage.svg"
import ReturnUrlFromIp from '../../../hooks/useReplaceUrl';
import { Skeleton } from 'primereact/skeleton';

const ProductDetailsThird = ({product, isLoading, complects, complectsCheck, complectInCart, extraClass}) => {
    const transformPrice = (price) => {
        return Number(price).toPrecision(4) / 100
    }
    
    return (

        <div className={`${styles.third_c} ${extraClass}`}>
            {isLoading ?
                <Skeleton height="2rem" className="mb-2"></Skeleton> :
                <h2>
                    {product?.name}
                </h2>
            }
            <p>Комплекты:</p>
            <div className={`${styles.complects} scrollbar_primary`}>
                {product?.productSet?.length ? complects.map((el, index) => {
                    return (
                        <label key={index} className={styles.complect}>
                            <input type="checkbox" checked={complectsCheck.some(x => x._id === el._id)} onChange={e => complectInCart(e, el)} />
                            {el.image ?
                                <img
                                    src={ReturnUrlFromIp(el.image)}
                                    className={styles.c_img}
                                    width={60}
                                    alt=""
                                /> :
                                <img
                                    src={BrokeImage}
                                    key={index}
                                    width={60}
                                    className={styles.img}
                                    alt=""
                                />
                            }
                            <div className={styles.title}>
                                <p className="">{el.name}</p>
                                <p className={styles.complect_unavailible}>{el.quantity > 0 ? '' : 'товар не в наличии'}</p>
                            </div>
                            <h5>{transformPrice(el.price)}</h5>
                        </label>
                    )
                }) :
                    <p className={styles.empty}>Комплекты в данном товаре отсутствуют</p>}
            </div>
        </div>
    );
};

export default ProductDetailsThird;