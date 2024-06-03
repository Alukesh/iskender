import React from 'react';
import { ReactComponent as CardIco } from '../icons/cardIco.svg';
import { ReactComponent as Logo } from '../icons/logoForCard.svg';
import { ReactComponent as QrCode } from '../icons/qrCode.svg';
import { ReactComponent as Ellipse1 } from '../icons/ellipseInsideCard1.svg';
import { ReactComponent as Ellipse2 } from '../icons/ellipseInsideCard2.svg';
import { ReactComponent as Ellipse3 } from '../icons/ellipseInsideCard3.svg';
import { useSelector } from 'react-redux';

const BonusCurd = () => {
  const { user } = useSelector(store => store.cart)
  return (
    <div className='bonus-curd container'>
      <div className='bonus-curd-block'>
        <Ellipse1 className='ellipse1' />
        <Ellipse2 className='ellipse2' />
        <Ellipse3 className='ellipse3' />
        <div className='bonus-curd-block_side'>
          <div className='bonus-curd-block_side-top'>
            <CardIco />
            <h5>Бонусная карта</h5>
          </div>
          <div className='bonus-curd-block_side-bonus'>
            <p>Бонусы:</p>
            <strong>{user?.points || 0} с</strong>
          </div>
          <small>{user?.name || 'ФИО'}</small>
        </div>
        <div className='bonus-curd-block_side'>
          <Logo className='logo' />
          <QrCode />
        </div>
      </div>
    </div>
  );
};
export default BonusCurd;
