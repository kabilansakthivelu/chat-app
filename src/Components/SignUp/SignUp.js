import React, {useRef, useContext} from 'react';
import './SignUp.css'; 
import firebase from 'firebase/compat/app';
import {db, auth} from '../../firebase';
import {Link, useHistory} from 'react-router-dom';
import {ValuesContext} from '../../App';
import {toast} from 'react-toastify';

toast.configure();

const SignUp = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const usernameRef = useRef();

    const history = useHistory();

    const signUpBtn = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        const username = usernameRef.current.value;
        if(username[0]===" "){
            toast.error("Username should not start with 'SPACE'. Enter a valid username", {position: toast.POSITION.TOP_CENTER})
        }else{
        try{
        await firebase.auth().createUserWithEmailAndPassword(email,password);
        history.push('/');
        await db.collection('users').doc(auth.currentUser.uid).set({
            name: username,
        })
        toast.success("Account created successfully !!", {position: toast.POSITION.TOP_CENTER})
        }
        catch(error){
            const error1 = error.message.split(":");
            const error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER})
        }
        }
    }

    return (
        <div className="signUpModal">
        <div className="signUpModalContent">
            <h1 className="appTitle">Welcome to Chat App</h1>
            <h1 className="pageHeader">Create a new Account</h1>
            <form className="signUpForm" onSubmit={signUpBtn}>
                <label htmlFor="username" className="nameLabel">Name</label>
                <input required type="text" name="username" id="username" className="nameInput" ref={usernameRef}/>
                <label htmlFor="emailId" className="emailLabel">Email</label>
                <input required type="email" name="emailId" id="emailId" className="emailInput" ref={refEmail}/>
                <label htmlFor="pwd" className="pwdLabel">Password</label>
                <input required type="password" name="pwd" id="pwd" className="pwdInput" ref={refPassword}/>
                <button className="signUpBtn">Sign Up</button>
            </form>
            <div className="footer">
                <p>Already have an account?</p>
                <Link to="/signIn" className="signInLink">Sign in</Link>
            </div>
        </div>
        </div>
    )
}

export default SignUp
