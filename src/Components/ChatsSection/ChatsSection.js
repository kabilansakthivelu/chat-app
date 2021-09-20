import React, {useState, useEffect, useRef, useContext} from 'react';
import {auth, db} from '../../firebase';
import {useParams, useHistory} from 'react-router-dom';
import {BsArrowLeftShort} from 'react-icons/bs';
import {IoSend} from 'react-icons/io5';
import {ValuesContext} from '../../App';
import Modal from 'react-modal';
import './ChatsSection.css';

const ChatsSection = () =>{

    const {groupIconSelected, modalImage, isImageSelected, setIsImageSelected, noImage} = useContext(ValuesContext);

    const {title} = useParams();

    const messageRef = useRef();

    const [chatsToBeDisplayed, setChatsToBeDisplayed] = useState([]);

    const [chatRoomId, setChatRoomId] = useState();

    const [username, setUsername] = useState();

    const [selectedRoomContent, setSelectedRoomContent] = useState({});

    useEffect(()=>{
    const roomsRef = db.collection ('rooms');
    setSelectedRoomContent({});
    roomsRef.onSnapshot((snapshot)=>{
        const arr =[];
        snapshot.forEach((doc)=>{
            arr.push({...doc.data(), id:doc.id});
        })
        const selectedRoom = arr.find((item)=>{
            return item.name === title;
        })
        setSelectedRoomContent(selectedRoom);
        test(selectedRoom.id);
        setChatRoomId(selectedRoom.id);
        return(()=>{
            setChatsToBeDisplayed([]);
        })
    })
    auth.currentUser.displayName || db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
            const userdetails = snapshot.data();
            setUsername(userdetails.name);
        });

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
        const fullName = auth.currentUser.displayName ? auth.currentUser.displayName.split(" ")[0] : username;
        const uid = auth.currentUser.uid;
        db.collection('rooms').doc(chatRoomId).collection('messages').add({
            id: time,
            time,
            text,
            uid,
            user: fullName,
        })
        messageRef.current.value = '';
    }
    
    return(
        <div className="chatsSection">
        <div className="roomHeader">
        <BsArrowLeftShort className="arrowIcon" onClick={()=>{history.push("/")}}/>
        <img src={selectedRoomContent.imageURL || noImage} alt="" className="roomIcon" onClick={()=>{groupIconSelected(selectedRoomContent.imageURL)}}/>
        <h1 className="roomTitle">{title}</h1>
        </div>
        <div className="chats">
        {chatsToBeDisplayed.map((chat)=>{
            const initialTime = parseInt(chat.time);
            const getTime = new Date(initialTime).toString();
            const setTime = getTime.split(" ");
            const time1 = setTime[4].split(":");
            let amOrPm;
            if(time1[0] > 12){
                let hours = time1[0] - 12;
                time1[0] = hours;
                if(time1[0] < 10){
                    time1[0] = "0"+time1[0];
                }
                amOrPm = "PM";
            }else{
                amOrPm = "AM";
            }
            const time = setTime[2] +" "+ setTime[1] +" "+ setTime[3] + "  " + time1[0]+":"+time1[1]+":"+time1[2] + " " + amOrPm;
            return(
                <div key=
                {chat.id} className="singleChat">
                <h1 className="chatAreaUser">{chat.user}</h1>
                <h1 className="chatAreaMessage">{chat.text}</h1>
                <h1 className="chatAreaTime">{time}</h1>
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

        <Modal isOpen={isImageSelected} onRequestClose={()=>{setIsImageSelected(false)}} className="iconModal">
        <img src={modalImage} alt="groupIcon" className="modalImage"/>
        </Modal>

        </div>
    )
}

export default ChatsSection