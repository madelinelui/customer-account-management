import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RegisterProduct from './components/RegisterProduct.jsx';
import ProductCard from './components/ProductCard.jsx';
import { Route, Routes } from 'react-router-dom';
import ListProducts from './components/ListProducts.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterProduct/>}></Route>
        <Route path="/products" element={<ListProducts/>}></Route>
      </Routes>
       
      
    </div>
  );
}

export default App;
