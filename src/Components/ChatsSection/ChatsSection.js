import React, {useState, useEffect, useRef} from 'react';
import {auth, db} from '../../firebase';
import {useParams, useHistory} from 'react-router-dom';
import {BsArrowLeftShort} from 'react-icons/bs';
import {IoSend} from 'react-icons/io5';
import './ChatsSection.css';

import {FaUserCircle} from 'react-icons/fa';

const ChatsSection = () =>{

    const {title} = useParams();

    const messageRef = useRef();

    const [chatsToBeDisplayed, setChatsToBeDisplayed] = useState([]);

    const [chatRoomId, setChatRoomId] = useState();

    useEffect(()=>{
    const roomsRef = db.collection ('rooms');
    roomsRef.onSnapshot((snapshot)=>{
        const arr =[];
        snapshot.forEach((doc)=>{
            arr.push({...doc.data(), id:doc.id});
        })
        const selectedRoom = arr.find((item)=>{
            return item.name === title;
        })
        test(selectedRoom.id);
        setChatRoomId(selectedRoom.id);
        return(()=>{
            setChatsToBeDisplayed([]);
        })
    })
    },[title])

    const test = (roomID) =>{
    const chatsRef = db.collection('rooms').doc(roomID).collection('messages');
    chatsRef.onSnapshot((snapshot)=>{
        const arr1 = [];
        snapshot.forEach((doc)=>{
            arr1.push({...doc.data()});
        })
        setChatsToBeDisplayed(arr1);
    })
    }

    const history = useHistory();

    const chatSend = (e) =>{
        e.preventDefault();
        const text = messageRef.current.value;
        const time = (new Date).getTime().toString();
        const fullName = auth.currentUser.displayName.split(" ");
        const firstName = fullName[0];
        db.collection('rooms').doc(chatRoomId).collection('messages').add({
            id: time,
            time,
            text,
            user: firstName,
        })
        messageRef.current.value = '';
    }
    
    return(
        <div className="chatsSection">
        <div className="roomHeader">
        <BsArrowLeftShort className="arrowIcon" onClick={()=>{history.push("/")}}/>
        <FaUserCircle className="roomIcon"/>
        <h1 className="roomTitle">Chat Room</h1>
        </div>
        <div className="chats">
        {chatsToBeDisplayed.map((chat)=>{
            return(
                <div key=
                {chat.id}>
                <h1>{chat.text}</h1>
                </div>
            )
        })}
        </div>
        <form className="roomFooter">
        <input type="text" placeholder="Type your message..." className="chatInput" ref={messageRef}/>
        <button onClick={chatSend}>
        <IoSend className="chatSendBtn"/>
        </button>
        </form>
        </div>
    )
}

export default ChatsSection