import React, {useState, useContext} from 'react'
import './LeftPanel.css';
import {ValuesContext} from '../../App';
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

const LeftPanel = () => {

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
                <div className="chatTitleSection">
                 <Link to={`/chats/${room.title}`}>
                <h1 className="chatRoomTitle">{room.title}</h1>
                </Link>
                </div>
                </div>
                <hr className="chatRoomDivider"/>
                </div>)
            })}
            </div>

        {/* Image Open Modal */}

        <Modal isOpen={isImageSelected} onRequestClose={()=>{setIsImageSelected(false)}} className="iconModal">
        <img src={modalImage} alt="groupIcon" className="modalImage"/>
        </Modal>

        </div>
    )
}

export default LeftPanel
