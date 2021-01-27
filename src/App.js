import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Route, Switch } from "react-router-dom"
import Testpage from './pages/Testpage/Testpage'
import Landing from './pages/Landing/Landing'
import Student_Dashboard from './pages/Student_Dashboard/Student_Dashboard'
import Staff_Dashboard from './pages/Staff_Dashboard/Staff_Dashboard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/testpage" exact component={Testpage} />
          <Route path="/student/dashboard" exact component={Student_Dashboard} />
          <Route path="/staff/dashboard" exact component={Staff_Dashboard} />
          <Route path="/" render={() => <div>error 404!</div>} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
