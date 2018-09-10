import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './containers/App';
import FourOFour from './containers/404Example'
import './index.css';
import Login from "./containers/Login";

ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/*' component={FourOFour} />
    </Switch>
</BrowserRouter>, document.getElementById('root'))

