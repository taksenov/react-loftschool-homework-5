import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addListener, removeListener, isAuthorized } from './AuthorizeApi';

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
            </div>
        );
    }
}

export default App;
