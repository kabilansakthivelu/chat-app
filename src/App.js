import React, {useRef, useEffect, useState} from 'react';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import Chats from './Components/Chats';
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

  const [isImageSelected, setIsImageSelected] = useState(false);

  const [modalImage, setModalImage] = useState("");

  const noImage = "https://www.searchpng.com/wp-content/uploads/2019/02/User-Icon-PNG.png";

  const groupIconSelected = (url) =>{
        let image = url ? url : noImage;
        setIsImageSelected(true);
        setModalImage(image);
    }

  return (
    <Router>
    <ValuesContext.Provider value={{refEmail, refPassword, rooms, groupIconSelected, modalImage, isImageSelected, setIsImageSelected, noImage}}>
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
    <Route path="/chats/:title" children={<Chats/>}></Route>
    <Route path="*">
      <Error/>
    </Route>
    </Switch>
     </ValuesContext.Provider>
    </Router>
  );
}

export default App;
