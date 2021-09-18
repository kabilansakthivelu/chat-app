import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import Header from '../Header/Header';
import LeftPanel from '../LeftPanel/LeftPanel';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);
    
    return (
        <>
        { user ? 
        (
        <>
        <Header/>
        <LeftPanel/>
         {/* Main content */}

            <div className="mainPanel">
            <div className="displayTextSection">
            <h1 className="defaultPageTitleText">Welcome to Chat App</h1>
            <h1 className="defaultPageText">Click on the chat rooms available on the left to continue your chat</h1>
            </div>
            </div>
        </>
        ) 
        : 
        <SignIn/>}
        </>
    )
}

export default Home
