import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './menu/Home';
import ItemList from './menu/ItemList';
import Personal from './menu/Personal';
import Projects from './menu/Projects';
import { authService } from './firebase';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as ItemListIcon } from "./icons/itemList.svg";
import { ReactComponent as PersonalIcon } from "./icons/personal.svg";
import { ReactComponent as ProjectIcon } from "./icons/projects.svg";



const App = () => {
  console.log(authService);
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ItemList" element={<ItemList />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Personal" element={<Personal />} />
          </Routes>
        </div>
        <div className="tabbar">
          <Link to="/"><HomeIcon fill="#FFFFFF" className="icons"/></Link>
          <Link to="/ItemList"><ItemListIcon fill="#FFFFFF" className="icons"/></Link>
          <Link to="/Projects"><ProjectIcon fill="#FFFFFF" className="icons"/></Link>
          <Link to="/Personal"><PersonalIcon fill="#FFFFFF" className="icons"/></Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
