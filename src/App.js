import React from 'react';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.scss';
import 'dotenv/config'

import Home from './app-pages/home';
import About from './app-pages/about';

export default class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </HashRouter>
    );
  }
}