import React from 'react'
import BasketTableItem from '../BasketItem/BasketTableItem';
import {useSelector} from 'react-redux';
import styles from './BasketTable.module.scss'
import BasketTableItemMn from "../BasketItem/BasketTableItemMn";

const BasketTable = ({cart,setState}) => {
    const renderList = () => {
        if (!cart) return null
        if (cart?.orderItems && cart?.orderItems?.length > 0) {
            return <>
                {
                    cart?.orderItems?.map((item) => (
                        <BasketTableItemMn setState={setState} product={item} key={item._id}/>
                    ))
                }
            </>
        }
        return <>
            {cart?.map((item) => (
                <BasketTableItem product={item} key={item.product._id}/>
            ))}
        </>


    }

    return (
        <div className={styles.table}>
            <div className={styles.table_heading}>
                <p className={styles.table_heading__item}>
                    Фото
                </p>
                <p className={styles.table_heading__item}>
                    Название
                </p>
                <p className={styles.table_heading__item}>
                    Кол-во
                </p>
                <p className={styles.table_heading__item}>
                    Цена
                </p>
                <div className={styles.table_heading__item}/>
            </div>

            {renderList()}
        </div>
    )
}

export default BasketTable
