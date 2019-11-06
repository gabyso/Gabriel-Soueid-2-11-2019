import React from 'react';
import Header from './Header';
import { Router, Route } from 'react-router-dom';
import Home from './content/Home';
import Favorites from './content/Favorites';
import history from '../history';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Header />
                <Route path="/" exact component={Home}/>
                <Route path="/favorites" component={Favorites}/>
            </Router>
        </div>
    );
};

export default App;