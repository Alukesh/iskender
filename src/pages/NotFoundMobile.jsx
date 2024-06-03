import LogoSmall from "../components/icons/logoSmall";
import { Link } from 'react-router-dom';
import { ReactComponent as Ellipse1} from '../components/icons/ellipseInsideCard1.svg';

const NotFoundMobile = () => {
    return (
        <div className="mobile-notFound">
            <Link aria-label="На главную" to="/home">
                <LogoSmall width={187} height={49} />
            </Link>
            <Ellipse1 className='circle ellipse1' />
            <Ellipse1 className='circle ellipse2' />
            <Ellipse1 className='circle ellipse3' />
            <Ellipse1 className='circle ellipse4' />
            <Ellipse1 className='circle ellipse5' />
            <Ellipse1 className='circle ellipse6' />
            <Ellipse1 className='circle ellipse7' />
            <h1 className="Gilroy-w white">404</h1>
            <span className="Gilroy-n white text">Страница не найдена</span>
        </div>
    );
};

export default NotFoundMobile;