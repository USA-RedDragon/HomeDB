import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './containers/App'
import Root from './containers/Root';
import FourOFour from './containers/404'
import './index.css';
import Login from "./containers/Login";

ReactDOM.render(
    <BrowserRouter>
        <Root>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path='/login' component={Login} />
                <Route path='/*' component={FourOFour} />
            </Switch>
        </Root>
</BrowserRouter>, document.getElementById('root'))

