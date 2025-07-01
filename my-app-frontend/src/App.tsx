import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />   
          <AppRoutes/>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
