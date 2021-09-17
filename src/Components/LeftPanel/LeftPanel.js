import React, {useState, useEffect} from 'react'
import {db} from '../../firebase';
import './LeftPanel.css';
import Modal from 'react-modal';

const LeftPanel = () => {

    const noImage = "https://www.searchpng.com/wp-content/uploads/2019/02/User-Icon-PNG.png";

    const [rooms, setRooms] = useState([]);

    const [isImageSelected, setIsImageSelected] = useState(false);

    const [modalImage, setModalImage] = useState("");

useEffect(()=>{
    const chatRoomRef = db.collection('rooms');
    chatRoomRef.onSnapshot(snapshot =>{
    const arr = [];
    snapshot.forEach((doc)=>{
    const data = doc.data();
    const obj = {
        id: data.id,
        title: data.name,
        imageURL: data.imageURL,
    }
    console.log(data.imageURL);
    arr.push(obj)
    })
    setRooms(arr);
})
},[])

    const groupIconSelected = (url) =>{
        let image = url ? url : noImage;
        setIsImageSelected(true);
        setModalImage(image);
    }

    return (
        <div>
            {rooms.map((room)=>{
                return(
                <div key={room.id} className="leftPanel">
                <div className="chatRoom">
                <img src={room.imageURL || noImage} alt="roomIcon" className="chatRoomIcon" onClick={()=>{groupIconSelected(room.imageURL)}}/>
                <h1 className="chatRoomTitle">{room.title}</h1>
                </div>
                <hr className="chatRoomDivider"/>
                </div>)
            })}

        <Modal isOpen={isImageSelected} onRequestClose={()=>{setIsImageSelected(false)}} className="iconModal">
        <img src={modalImage} alt="groupIcon" className="modalImage"/>
        </Modal>

        </div>
    )
}

export default LeftPanel
