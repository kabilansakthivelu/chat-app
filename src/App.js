import React, {useRef, useEffect, useState} from 'react';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import Error from './Components/Error';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Modal from 'react-modal';
import {db} from './firebase';

Modal.setAppElement("#root");

export const ValuesContext = React.createContext();

function App() {

  const [rooms, setRooms] = useState([]);

  useEffect(()=>{
    const chatRoomRef = db.collection('rooms');
    chatRoomRef.onSnapshot(snapshot =>{
    const arr = [];
    snapshot.forEach((doc)=>{
    const data = doc.data();
    const obj = {
        id: data.id,
        title: data.name,
        imageURL: data.imageURL,
    }
        arr.push(obj)
    })
    setRooms(arr);
})
},[])

  const refEmail =useRef();
  const refPassword = useRef();

  return (
    <Router>
    <ValuesContext.Provider value={{refEmail, refPassword, rooms}}>
    <Switch>
    <Route exact path="/">
      <Home/>
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
