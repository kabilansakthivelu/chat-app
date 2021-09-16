import React, {useRef} from 'react';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Content from './Components/Content';
import Error from './Components/Error';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement("#root");

export const ValuesContext = React.createContext();

function App() {

  const refEmail =useRef();
  const refPassword = useRef();

  return (
    <Router>
    <ValuesContext.Provider value={{refEmail, refPassword}}>
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
     </ValuesContext.Provider>
    </Router>
  );
}

export default App;
