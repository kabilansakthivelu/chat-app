import React, {useState, useEffect, useRef, useContext} from 'react';
import {auth, db} from '../../firebase';
import {useParams, useHistory} from 'react-router-dom';
import {BsArrowLeftShort, BsThreeDots} from 'react-icons/bs';
import {IoSend} from 'react-icons/io5';
import {ValuesContext} from '../../App';
import Modal from 'react-modal';
import {toast} from 'react-toastify';
import ReactScrollableFeed from 'react-scrollable-feed';
import './ChatsSection.css';

toast.configure();
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
    const chatsRef = db.collection('rooms').doc(roomID).collection('messages').orderBy('time');
    chatsRef.onSnapshot((snapshot)=>{
        const arr1 = [];
        snapshot.forEach((doc)=>{
            arr1.push({...doc.data(), docId:doc.id, inputId:arr1.length, textId:arr1.length+"a"});
        })
        setChatsToBeDisplayed(arr1);
    })
    }

    const history = useHistory();

    const chatSend = (e) =>{
        e.preventDefault();
        const text = messageRef.current.value;
        if(text[0]!==" "){
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
        }else{
            toast.warning("Please don't start your chat with 'SPACE'. Enter a valid message",{position: toast.POSITION.TOP_CENTER});
        }
        messageRef.current.value = '';
    }

    const showOptions = (id, docId, inputId, textId) =>{
         if(document.getElementById(id).style.display === "none" || document.getElementById(id).style.display ==="")
        {
        document.getElementById(id).style.display = "inherit";
        document.getElementById(docId).style.display = "none";
        document.getElementById(inputId).style.display = "none";
        document.getElementById(textId).style.display = "inherit";

        }
        else
        {
            document.getElementById(id).style.display = "none";
        }
    }

    const deleteChat = (id) => {
        db.collection('rooms').doc(chatRoomId).collection('messages').doc(id).delete();
    }

    const editChat = async(id, docId, inputId, textId, text) => {
        document.getElementById(id).style.display = "none";
        document.getElementById(docId).style.display = "inherit";
        document.getElementById(inputId).style.display = "inherit";
        document.getElementById(textId).style.display = "none";
        document.getElementById(inputId).value = text;
    }
    
   const closeEditChat = (docId, inputId, textId)=>{
       document.getElementById(docId).style.display = "none";
       document.getElementById(inputId).style.display = "none";
       document.getElementById(textId).style.display = "inherit";
   } 

   const saveChanges = (inputId, id, time, user, docId, textId) =>{
        const text = document.getElementById(inputId).value;
        const uid = auth.currentUser.uid;
        db.collection('rooms').doc(chatRoomId).collection('messages').doc(id).set({
            id: time,
            time,
            text,
            uid,
            user,
       })
       document.getElementById(docId).style.display = "none";
       document.getElementById(inputId).style.display = "none";
       document.getElementById(textId).style.display = "inherit";
   }

    return(
        <div className="chatsSection" id="chatsSection">
        <div className="roomHeader">
        <BsArrowLeftShort className="arrowIcon" onClick={()=>{history.push("/")}}/>
        <img src={selectedRoomContent.imageURL || noImage} alt="" className="roomIcon" onClick={()=>{groupIconSelected(selectedRoomContent.imageURL)}}/>
        <h1 className="roomTitle">{title}</h1>
        </div>
        <div className="chats">
        <ReactScrollableFeed>
        <div className="scrollableDiv">
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

            let divName="";
            let userSent="";
            let chatAreaIconEnable ="";

            if(chat.uid === auth.currentUser.uid){
               divName = "singleChatSent";
               userSent = "You";
               chatAreaIconEnable = "enabled";
            }
            else{
               divName = "singleChatReceived";
               userSent = chat.user;
               chatAreaIconEnable = "disabled";
            }
            
            return(
                <div key=
                {chat.id} className={divName}>
                <div className="chatAreaHeader">
                <h1 className="chatAreaUser">{userSent}</h1>
                <BsThreeDots className={chatAreaIconEnable} onClick={()=>{showOptions(chat.id, chat.docId, chat.inputId, chat.textId)}}/>
                </div>
                <input type="text" className="editChatInput" id={chat.inputId}/>
                <h1 className="chatAreaMessage" id={chat.textId}>{chat.text}</h1>
                <h1 className="chatAreaTime">{time}</h1>

                {/* More Options in Chat */}

                <div className="charAreaOptions" id={chat.id}>
                <button className="editChatBtn" 
                onClick=
                {()=>{editChat(chat.id, chat.docId, chat.inputId, chat.textId, chat.text)}}
                >Edit</button>
                <button className="deleteChatBtn" onClick={()=>{deleteChat(chat.docId)}}>Delete</button>
                </div>

                {/* Edit Options in chat */}

                <div className="chatAreaSaveOptions" id={chat.docId}>
                <button className="editChatBtn" onClick={()=>{saveChanges(chat.inputId, chat.docId, chat.time, chat.user, chat.docId, chat.textId)}}>Save</button>
                <button className="deleteChatBtn" onClick={()=>{closeEditChat(chat.docId, chat.inputId, chat.textId)}}>Cancel</button>
                </div>
                </div>
            )
        })}
        </div>
        </ReactScrollableFeed>
        </div>
        <form className="roomFooter" onSubmit={chatSend}>
        <input required type="text" placeholder="Type your message..." className="chatInput" ref={messageRef}/>
        <button>
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