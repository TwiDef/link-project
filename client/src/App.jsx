import React from 'react';
import './App.css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';

function App() {
    const { token, userId, login, logout } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    return (

        <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
            <Navbar />
            <div className='container max-w-screen-xl mx-auto px-4'>
                {routes}
            </div>
        </AuthContext.Provider >
    );
}

export default App;

