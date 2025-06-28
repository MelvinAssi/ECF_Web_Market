import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />   
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
