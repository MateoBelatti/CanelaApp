import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  Header  from "./components/layouts/header";
import Footer from './components/layouts/footer';
import HomePage from './pages/homePage';
import ContactPage from './pages/contactoPage';
import ProductPage from './pages/productPage';

function App() {
  
  return (
    <Router>
      <Header />
      <main>
        {/* RUTAS */}
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/producto" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
