import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ContactPage from '../pages/ContactPage';
import AuthRoute from './AuthRoute';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import AccountPage from '../pages/AccountPage';
import CartPage from '../pages/CartPage';
import CatalogPage from '../pages/CatalogPage';

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signin" element={<AuthRoute><SignInPage/></AuthRoute> } />
            <Route path="/signup" element={<AuthRoute><SignUpPage/></AuthRoute> } />
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/catalog" element={<CatalogPage/>}/>
            <Route path="/dashbord" element={<PrivateRoute><DashboardPage/></PrivateRoute> } />
            <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute> } />
        </Routes>
        </>
    )
}
export default AppRoutes;