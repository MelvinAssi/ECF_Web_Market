import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ContactPage from '../pages/ContactPage';
import AuthRoute from './AuthRoute';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signin" element={<AuthRoute><SignInPage/></AuthRoute> } />
            <Route path="/signup" element={<AuthRoute><SignUpPage/></AuthRoute> } />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/dashbord" element={<PrivateRoute><DashboardPage/></PrivateRoute> } />
        </Routes>
        </>
    )
}
export default AppRoutes;