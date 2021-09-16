import React from 'react'
import './SignIn.css';
import {FcGoogle} from 'react-icons/fc';
import {Link} from 'react-router-dom';

const SignIn = () => {
    return (
        <div className="signInModal">
        <div className="signInModalContent">
            <h1 className="appTitle">Welcome to Chat App</h1>
            <h1 className="pageHeader">Sign In to your Account</h1>
            <FcGoogle className="googleIcon"/>
            <p className="sectionDivider">or</p>
            <form className="signInForm">
                <label htmlFor="emailId" className="emailLabel">Email</label>
                <input type="email" name="emailId" id="emailId" className="emailInput"/>
                <label htmlFor="pwd" className="pwdLabel">Password</label>
                <input type="password" name="pwd" id="pwd" className="pwdInput"/>
                <button className="signInBtn">Sign In</button>
            </form>
            <div className="footer">
                <p>New to Chat App?</p>
                <Link to="/signUp" className="signUpLink">SignUp</Link>
            </div>
        </div>
        </div>
    )
}

export default SignIn
