import React from 'react';
import './App.css';
import { useRoutes } from './routes';


function App() {
    const routes = useRoutes()

    return (
        <div className='container mx-auto'>
            {routes}
        </div>
    );
}

export default App;
