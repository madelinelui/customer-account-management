import './App.css';
import Calculator from './components/Calculator';
import ResultPage from './components/ResultPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Calculator />}></Route>
        <Route path="/show-results/:sum" element={ <ResultPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
