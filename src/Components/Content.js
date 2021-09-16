import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import SignIn from './SignIn/SignIn';
import Header from './Header/Header';

const Content = () => {

    const [user] = useAuthState(auth);
    
    return (
        <>
        { user ? (<Header/>
        ) : 
        <SignIn/>}
        </>
    )
}

export default Content
