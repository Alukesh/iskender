import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import useCheckMobileScreen from "./hooks/useCheckMobileScreen";
import { useSelector } from "react-redux";
import { Route } from 'react-router-dom';
import Layout from './components/layouts/layout';
// import Addresses from './pages/Addresses';
// import CategoryPage from './pages/CategoryPage';
// import DetailOfProduct from './pages/DetailOfProduct';
// import ManageOrders from './pages/ManagerOrders';
// import NewsAndPromotions from './components/myAccount/pages/NewsAndPromotions';
// import DetailNews from './components/myAccount/pages/DetailNews';
import PersonalAccountMobile from "./components/myAccountMobile/PersonalAccountMobile";
import PersonalAccount from './pages/PersonalAccount';
import Basket from './pages/Basket';
import Main from './pages/Main';
import Catalog from './pages/Catalog';
import NotFound from './pages/NotFound';
import NotFoundMobile from './pages/NotFoundMobile';
import { lazy } from "react";


// const Main = lazy(() => import('./pages/Main'))
// const Catalog = lazy(() => import('./pages/Catalog'))
// const PersonalAccount = lazy(() => import('./pages/PersonalAccount'))
// const PersonalAccountMobile = lazy(() => import('./components/myAccountMobile/PersonalAccountMobile'))
const DetailNews = lazy(() => import('./components/myAccount/pages/DetailNews'));
const NewsAndPromotions = lazy(() => import('./components/myAccount/pages/NewsAndPromotions'));
const DetailOfProduct = lazy(() => import('./pages/DetailOfProduct'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ManageOrders = lazy(() => import('./pages/ManagerOrders'))
const Addresses = lazy(() => import('./pages/Addresses'))

const AppRouter = () => {
    const { user } = useSelector(state => state.cart);
    const isMobile = useCheckMobileScreen();
    const isManager = user.role === 'manager';

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/'
        >
            <Route element={<Layout />}>
                <Route index element={<Main />} />
                <Route path='home' element={<Main />} />
                <Route path='catalog' element={<Catalog />} />
                <Route path='news-and-promotions' element={<NewsAndPromotions />} />
                <Route path='news-and-promotions/:id' element={<DetailNews />} />
                <Route path='catalog/:id' element={<CategoryPage />} />
                <Route path='addresses' element={<Addresses />} />
                <Route path='basket' element={isManager ? <ManageOrders /> : <Basket />} />
                <Route path='my-account/*' element={isMobile ? <PersonalAccountMobile /> : <PersonalAccount />} />
                <Route path='catalog/:category/:id' element={<DetailOfProduct />} />
            </Route>
            <Route path='*' element={useCheckMobileScreen(500) ?
                <NotFoundMobile /> :
                <NotFound />} />
        </Route>
    ))

    return router;
};
export default AppRouter;

