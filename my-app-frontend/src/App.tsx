import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';

function App() {

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />   
              <AppRoutes/>
              <Footer/>
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
