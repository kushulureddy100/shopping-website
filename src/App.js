import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Account from './pages/Account';
import Comments from './pages/Comments';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <main className="py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/account" element={<Account />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;