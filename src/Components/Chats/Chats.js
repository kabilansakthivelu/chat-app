import React, {useState, useContext} from 'react'
import './Chats.css';
import {ValuesContext} from '../../App';
import Modal from 'react-modal';

const Chats = () => {

    const {rooms} = useContext(ValuesContext);

    const noImage = "https://www.searchpng.com/wp-content/uploads/2019/02/User-Icon-PNG.png";

    const [isImageSelected, setIsImageSelected] = useState(false);

    const [modalImage, setModalImage] = useState("");

    const groupIconSelected = (url) =>{
        let image = url ? url : noImage;
        setIsImageSelected(true);
        setModalImage(image);
    }

    return (
        <div className="chatsPage">

        {/* Left Panel */}

        <div className="leftPanel">
            {rooms.map((room)=>{
                return(
                <div key={room.id} className="leftPanelContent">
                <div className="chatRoom">
                <img src={room.imageURL || noImage} alt="roomIcon" className="chatRoomIcon" onClick={()=>{groupIconSelected(room.imageURL)}}/>
                <h1 className="chatRoomTitle">{room.title}</h1>
                </div>
                <hr className="chatRoomDivider"/>
                </div>)
            })}
            </div>

        {/* Main content */}

            <div className="mainPanel">
            <div className="displayTextSection">
            <h1 className="defaultPageTitleText">Welcome to Chat App</h1>
            <h1 className="defaultPageText">Click on the chat rooms available on the left to continue your chat</h1>
            </div>
            </div>

        {/* Image Open Modal */}

        <Modal isOpen={isImageSelected} onRequestClose={()=>{setIsImageSelected(false)}} className="iconModal">
        <img src={modalImage} alt="groupIcon" className="modalImage"/>
        </Modal>

        </div>
    )
}

export default Chats
