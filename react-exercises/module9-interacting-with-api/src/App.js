import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterProduct from './components/RegisterProduct.jsx';
import ListProducts from './components/ListProducts.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register-products" element={ <RegisterProduct/>}></Route>
        <Route path="/" element={<ListProducts/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
