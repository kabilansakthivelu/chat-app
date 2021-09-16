import React from 'react';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Content from './Components/Content';
import Error from './Components/Error';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
    <Route exact path="/">
      <Content/>
    </Route>
    <Route path="/signin">
      <SignIn/>
    </Route>
    <Route path="/signup">
      <SignUp/>
    </Route>
    <Route path="*">
      <Error/>
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
