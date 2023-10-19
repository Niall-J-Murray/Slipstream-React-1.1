// import ReactDOM from 'react-dom/client';
// import {BrowserRouter} from "react-router-dom";
// import React from 'react';
//
// // import 'virtual:uno.css'
// import "../src/assets/css/custom.css";
// import './index.css';
//
// import App from './App';
//
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
//
// root.render(
//     <BrowserRouter>
//         <React.StrictMode>
//             <App/>
//         </React.StrictMode>
//     </BrowserRouter>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'virtual:uno.css'
import "../src/assets/css/custom.css";

import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
