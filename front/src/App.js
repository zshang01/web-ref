import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register';
import Studentpage from './components/studentpage';
import Workerpage from './components/workerpage';
import Studentregister from './components/studentregister';
import Workerregister from './components/workerregister';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store'

import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={ store}>
        <Router>
          <div className="App">
            <Route exact path = "/" component = { Landing } />
            <div className='container'>
              <Route exact path="/Register" component = {Register} />
              <Route exact path="/Login" component = {Login} />
              <Route exact path="/Studentpage" component={Studentpage}/> 
              <Route exact path="/Workerpage" component={Workerpage}/> 
              <Route exact path="/Studentregister" component={Studentregister}/> 
              <Route exact path="/WorkerRegister" component={Workerregister}/> 
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
