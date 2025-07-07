import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

function App() {

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <ScrollToTop />   
            <AppRoutes/>
            <Footer/>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
