import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import Header from '../Header/Header';
import LeftPanel from '../LeftPanel/LeftPanel';
import {useParams, useHistory} from 'react-router-dom';
import {BsArrowLeftShort} from 'react-icons/bs'
import './Chats.css';

import {FaUserCircle} from 'react-icons/fa';

export const ChatsSection = () =>{

    const history = useHistory();
    
    return(
        <div className="chatsSection">
        <div className="roomHeader">
        <BsArrowLeftShort className="arrowIcon" onClick={()=>{history.push("/")}}/>
        <FaUserCircle className="roomIcon"/>
        <h1 className="roomTitle">Chat Room</h1>
        </div>
        <p className="chats">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ducimus non ab doloremque distinctio? Doloribus vero iure modi ullam sequi, delectus ducimus, molestias labore consequatur facere tenetur aliquid incidunt sunt aspernatur perspiciatis error ea cupiditate eligendi! Dignissimos maxime repellat, laboriosam corporis asperiores officiis nisi eos eius esse numquam omnis ab?</p>
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
