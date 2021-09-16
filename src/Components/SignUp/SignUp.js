import React, { useContext} from 'react';
import './SignUp.css'; 
import firebase from 'firebase/compat/app';
import {Link, useHistory} from 'react-router-dom';
import {ValuesContext} from '../../App';

const SignUp = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const history = useHistory();

    const signUpBtn = (e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        firebase.auth().createUserWithEmailAndPassword(email,password);
        history.push('/');
    }

    return (
        <div className="signUpModal">
        <div className="signUpModalContent">
            <h1 className="appTitle">Welcome to Chat App</h1>
            <h1 className="pageHeader">Create a new Account</h1>
            <form className="signUpForm" onSubmit={signUpBtn}>
                <label htmlFor="username" className="nameLabel">Name</label>
                <input required type="text" name="username" id="username" className="nameInput"/>
                <label htmlFor="emailId" className="emailLabel">Email</label>
                <input required type="email" name="emailId" id="emailId" className="emailInput" ref={refEmail}/>
                <label htmlFor="pwd" className="pwdLabel">Password</label>
                <input required type="password" min="8" name="pwd" id="pwd" className="pwdInput" ref={refPassword}/>
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
