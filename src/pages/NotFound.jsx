import LogoSmall from "../components/icons/logoSmall";
import { Link, useRouteError } from 'react-router-dom';
import { ReactComponent as Ellipse1 } from '../components/icons/ellipseInsideCard1.svg';
// import { ReactComponent as Ellipse3 } from '../components/icons/ellipseInsideCard3.svg';

const NotFound = () => {
    const error = useRouteError();
    return (
        <div className="notFound">
            <Link aria-label="На главную" to="/home">
                <LogoSmall width={187} height={49} />
            </Link>
            <div className="notFound-block">
                <Ellipse1 className='circle ellipse1' />
                <Ellipse1 className='circle ellipse2' />
                <Ellipse1 className='circle ellipse3' />
                <Ellipse1 className='circle ellipse3' />
                <Ellipse1 className='circle ellipse4' />
                <Ellipse1 className='circle ellipse5' />
                <Ellipse1 className='circle ellipse6' />
                <h1 className="Gilroy-w white">404</h1>
                <p className="Gilroy-n white text">Страница не найдена</p>
            </div>
        </div>
    );
};

export default NotFound;