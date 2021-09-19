import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import SignIn from './SignIn/SignIn';
import Header from './Header/Header';
import LeftPanel from './LeftPanel/LeftPanel';
import ChatsSection from './ChatsSection/ChatsSection';

const Chats = () => {

    const [user] = useAuthState(auth);

    const [isMobileView, setIsMobileView] = useState(false);
    
    const checkSize = () =>{
        if(window.innerWidth >= '768'){
            setIsMobileView(false)
        }else{
            setIsMobileView(true)
        }
    }
    
    useEffect(()=>{
        checkSize();
        window.addEventListener('resize', checkSize);
        return(()=>{
        window.removeEventListener('resize', checkSize); 
        })
    },[])
    
    return (
        <>
        { user ? 
        ( isMobileView ? 
        (<>
        <Header/>
        <ChatsSection/>
        </>)
         : 
        (<>
        <Header/>
        <LeftPanel/>
        <ChatsSection/>
        </>)
        ) 
        : 
        <SignIn/>}
        </>
    )
}

export default Chats
