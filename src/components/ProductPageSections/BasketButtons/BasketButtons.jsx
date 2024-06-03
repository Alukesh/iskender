import { ReactComponent as Plus } from "../../../components/icons/plus.svg"
import { ReactComponent as Minus } from "../../../components/icons/minus.svg"
import { LightTooltip } from "../../../components/LightTooltip/LightTooltip"
import style from './basketButtons.module.css'

const BasketButtons = ({ AddToBasket, RemoveFromBasket, isAdded, countCart, prompt, handleContextMenu, preventContextMenu }) => {
    return (
        <div className={style.bottom}>
            <div className={style.quantity}>
                <div
                    className={style.mathDiv}
                    onClick={RemoveFromBasket}
                    onContextMenu={preventContextMenu}
                >
                    <Minus />
                </div>
                <div>{countCart}</div>
                <LightTooltip title={prompt} arrow placement="top">
                    <div
                        className={style.mathDiv + ` ${isAdded ? style.added : ''}`}
                        onClick={AddToBasket}
                        onContextMenu={handleContextMenu}
                    >
                        <Plus />
                    </div>
                </LightTooltip>
            </div>
            <button className={style.toBasket} onClick={handleContextMenu}>В корзину</button>
        </div>
    );
};

export default BasketButtons;