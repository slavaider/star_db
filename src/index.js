import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import App from './components/app';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
