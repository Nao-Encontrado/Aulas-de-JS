import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/pages/login';
import CreateUser from './components/pages/CreateUser';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/Cadastre-se' element={<CreateUser/>} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;