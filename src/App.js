import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Chat } from './components';

function App() {
  return (
    <Router>
      <Link to="/chat">다른페이지</Link>
        <Route exact path='/chat' component={Chat}/>
    </Router>
  );
}

export default App;
