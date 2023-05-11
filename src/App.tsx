import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
import './assets/css/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import MainPage from './components/main/MainPage';
import NewGame from './components/new/NewGame';
import NewOffer from './components/offers/NewOffer';
import GameDetails from './components/game/GameDetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<MainPage />} />
                <Route path='/new' element={<NewGame />} />
                <Route path='/game/:id' element={<GameDetails />} />
                <Route path='/offer/:id' element={<NewOffer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
