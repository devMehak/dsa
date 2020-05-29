import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import All from "./components/All.component";
import Edit from "./components/Edit.component";
import Create from "./components/Create.component";


function App() {
  return (
    <Router>
      <Route path = "/" exact component = {All}/>
      <Route path = "/edit/:id" component = {Edit}/>
      <Route path = "/create" component = {Create}/>
    </Router>
  );
}
export default App;
