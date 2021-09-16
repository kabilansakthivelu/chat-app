import React, {useState} from 'react';
import './Header.css';
import {auth} from '../../firebase';
import {FaSignOutAlt} from 'react-icons/fa';
import {toast} from 'react-toastify';
import Modal from 'react-modal';

toast.configure();

const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const signOutFn =()=>{
        auth.signOut();
        toast.success("Signed Out successfully !!", {position: toast.POSITION.TOP_CENTER})
    }

    return (
        <>
        <div className="header">
        <h1 className="header-title">Chat App</h1>
        <FaSignOutAlt className="signOutBtn" onClick={()=>{setShowModal(true)}}/>
        <span className="signOutButton" onClick={()=>{setShowModal(true)}}>Sign Out</span>
        </div>

        <Modal isOpen={showModal} onRequestClose={()=>{setShowModal(false)}}
        style={{content:{
            borderColor: "green",
            borderRadius : '1rem',
            height: '11rem',
            margin: 'auto',
            width: '65%',
            backgroundColor: '#e6ffe6',
            },
            }}>
        <h1 className="modalDescription">Are you sure to sign out?</h1>
        <div className="modalButtons">
        <button className="modalYesButton" onClick={signOutFn}>Yes</button>
        <button className="modalNoButton" onClick={()=>{setShowModal(false)}}>No</button>
        </div>
        </Modal>
        </>
    )
}

export default Header
