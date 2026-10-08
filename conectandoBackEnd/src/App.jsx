import './App.css';
import Login from './pages/Login/index';
import CreateUser from './pages/CreateUser/index';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <>
        <div className='Content'>
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cadastre-se" element={<CreateUser />} />
                </Routes>
            </BrowserRouter>
        </div>
        </>
    )
}

export default App;