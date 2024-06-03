import { Link } from "react-router-dom"

const Burger = ({ show }) => {
    return (
        <div
            style={{ transform: `translateY(${show ? "0" : "-100%"})` }}
            className="burger"
        >
            <ul className="burger-list">
                <li>
                    <Link to="/home">Главная</Link>
                </li>
                <li>
                    <Link to="/home">Каталог</Link>
                </li>
                <li>
                    <Link to="/home">Адреса</Link>
                </li>
                <li>
                    <Link to="/home">Корзина</Link>
                </li>
            </ul>
        </div>
    )
}

export default Burger
