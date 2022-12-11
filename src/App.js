import { useState } from 'react';
import './App.css';
import { Connection } from './Connection';
import {HashRouter} from 'react-router-dom'
import Leftnav from './Navs/Leftnav';
import Topnav from './Navs/Topnav';
import Routing from './Routing';

function App() {

  const [navtool, setnavtool] = useState('')

  return (
    <Connection.Provider value={{navtool, setnavtool}}>
      <HashRouter>
        <Topnav/>
        <Leftnav/>
        <Routing/>
      </HashRouter>
    </Connection.Provider>
  );
}

export default App;
