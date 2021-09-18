import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import Header from '../Header/Header';
import LeftPanel from '../LeftPanel/LeftPanel';
import {useParams} from 'react-router-dom';
import './Chats.css';

export const ChatsSection = () =>{

    return(
        <div className="chatsSection">
        <h1>Hello world</h1>
        <p>Passed</p>
        </div>
    )
}

const Chats = () => {

    const [user] = useAuthState(auth);

    const {id} = useParams();

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
