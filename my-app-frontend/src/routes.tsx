import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ContactPage from './pages/ContactPage';

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
        </Routes>
        </>
    )
}
export default AppRoutes;