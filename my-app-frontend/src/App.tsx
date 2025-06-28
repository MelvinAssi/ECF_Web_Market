import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.tsx';
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>        
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
