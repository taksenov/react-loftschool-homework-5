import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { addListener, removeListener, isAuthorized } from './AuthorizeApi';
import Home from './Home';
import Public from './Public';
import Private from './Private';
import Auth from './Auth';

import './App.css';

class App extends Component {
    state = {
        isAuthorized
    };

    componentDidMount() {
        addListener(this.handleAuthorize);
    }

    componentWillUnmount() {
        removeListener(this.handleAuthorize);
    }

    handleAuthorize = isAuthorized => {
        this.setState({ isAuthorized });
    };

    render() {
        const { isAuthorized } = this.state;
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/auth">Войти</Link>
                        </li>
                        <li>
                            <Link to="/private">Секретная страница</Link>
                        </li>
                        <li>
                            <Link to="/public">Публичная страница</Link>
                        </li>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                    </ul>
                </nav>
                <hr />
                <div>
                    <Switch>
                        <Route
                            path="/auth"
                            render={props => (
                                <Auth isAuthorized={isAuthorized} {...props} />
                            )}
                        />
                        {isAuthorized === true ? (
                            <Route path="/private" component={Private} />
                        ) : null}
                        <Route path="/public" component={Public} />
                        <Route path="/" exact component={Home} />
                        {isAuthorized === false ? (
                            <Redirect from="/private" to="/auth" />
                        ) : (
                            false
                        )}
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

// <Route path="/auth" component={Auth} />
