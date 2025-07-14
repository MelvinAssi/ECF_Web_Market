import { Routes, Route } from 'react-router-dom';

import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';

import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ContactPage from '../pages/ContactPage';
import DashboardPage from '../pages/DashboardPage';
import AccountPage from '../pages/AccountPage';
import CartPage from '../pages/CartPage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';

import UserInfoPage from "../pages/user/UserInfoPage";
import UserListingsPage from "../pages/user/UserListingsPage";
import UserOrdersPage from "../pages/user/UserOrdersPage";
import UserTransactionsPage from "../pages/user/UserTransactionsPage";
import UserReviewsPage from "../pages/user/UserReviewsPage";

import AdminPage from '../pages/AdminPage';
import UsersPage from '../pages/admin/UsersPage';
import ProductsPage from '../pages/admin/ProductsPage';
import ListingsPage from '../pages/admin/ListingsPage';
import CategoriesPage from '../pages/admin/CategoriesPage';
import OrdersPage from '../pages/admin/OrdersPage';
import TransactionsPage from '../pages/admin/TransactionsPage';
import ReviewsPage from '../pages/admin/ReviewsPage';
import ContactsPage from '../pages/admin/ContactsPage';
import StatsPage from '../pages/admin/StatsPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<AuthRoute><SignInPage /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Authenticated */}
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
            <Route path="/dashbord" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/user/info" element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
            <Route path="/user/listings" element={<PrivateRoute><UserListingsPage /></PrivateRoute>} />
            <Route path="/user/orders" element={<PrivateRoute><UserOrdersPage /></PrivateRoute>} />
            <Route path="/user/transactions" element={<PrivateRoute><UserTransactionsPage /></PrivateRoute>} />
            <Route path="/user/reviews" element={<PrivateRoute><UserReviewsPage /></PrivateRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><ProductsPage /></AdminRoute>} />
            <Route path="/admin/listings" element={<AdminRoute><ListingsPage /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><CategoriesPage /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><OrdersPage /></AdminRoute>} />
            <Route path="/admin/transactions" element={<AdminRoute><TransactionsPage /></AdminRoute>} />
            <Route path="/admin/reviews" element={<AdminRoute><ReviewsPage /></AdminRoute>} />
            <Route path="/admin/contacts" element={<AdminRoute><ContactsPage /></AdminRoute>} />
            <Route path="/admin/stats" element={<AdminRoute><StatsPage /></AdminRoute>} />
        </Routes>
    );
};

export default AppRoutes;
