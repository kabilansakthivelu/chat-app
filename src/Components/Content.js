import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import SignIn from './SignIn/SignIn';

const Content = () => {

    const [user] = useAuthState(auth);
    
    return (
        <>
        { user ? (
            <div>
                <h1>Content page</h1>
                <button onClick={()=>auth.signOut()}>Sign out</button>
                <p>{auth.currentUser.uid}</p>
            </div>
        ) : 
        <SignIn/>}
        </>
    )
}

export default Content
