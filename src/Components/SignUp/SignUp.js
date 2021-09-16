import React from 'react';
import './SignUp.css'; 
import {Link} from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="signUpModal">
        <div className="signUpModalContent">
            <h1 className="appTitle">Welcome to Chat App</h1>
            <h1 className="pageHeader">Create a new Account</h1>
            <form className="signUpForm">
                <label htmlFor="username" className="nameLabel">Name</label>
                <input required type="text" name="username" id="username" className="nameInput"/>
                <label htmlFor="emailId" className="emailLabel">Email</label>
                <input required type="email" name="emailId" id="emailId" className="emailInput"/>
                <label htmlFor="pwd" className="pwdLabel">Password</label>
                <input required type="password" name="pwd" id="pwd" className="pwdInput"/>
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
