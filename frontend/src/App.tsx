import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  Header  from "./components/layouts/header";
import Footer from './components/layouts/footer';
import HomePage from './pages/homePage';
import ContactPage from './pages/contactoPage';
import StorePage from './pages/storePage';
import { AuthPage } from './pages/authPage';
import { PerfilPage } from './pages/perfilPage';
import CarritoPage from './pages/carritoPage';
import { PerfilAdminPage } from './pages/perfilAdminPage';

function App() {
  
  return (
    <Router>
      <Header />
      <main>
        {/* RUTAS */}
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/producto" element={<StorePage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/perfil' element={<PerfilPage />} />
          <Route path='/admin' element={<PerfilAdminPage />}/>
          <Route path='/carrito' element={<CarritoPage />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
