import React, {useContext} from 'react';
import firebase from 'firebase/compat/app';
import './SignIn.css';
import {ValuesContext} from '../../App';
import {FcGoogle} from 'react-icons/fc';
import {Link, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const SignIn = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const history = useHistory();

    //Google Authentication
    const googleAuth = async() =>{
        let provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        history.push('/');
        toast.success("Signed In successfully !!", { position: toast.POSITION.TOP_CENTER})
    }

    //Sign In with Email and Password
    const signInBtn = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        try{
        await firebase.auth().signInWithEmailAndPassword(email,password);
        history.push('/');
        toast.success("Signed In successfully !!", {position: toast.POSITION.TOP_CENTER})
        }
        catch(error){
            const error1 = error.message.split(":");
            const error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER})
        }
    }

    const guestLogin = () =>{
        const email = process.env.REACT_APP_Guest_Email;
        const password = process.env.REACT_APP_Guest_Password;
        firebase.auth().signInWithEmailAndPassword(email,password);
        history.push('/');
        toast.success("Signed In successfully !!", {position: toast.POSITION.TOP_CENTER})
    }

    return (
        <div className="signInModal">
        <div className="signInModalContent">
            <h1 className="appTitle">Chat App</h1>
            <div className="googleSignInBtn" onClick={googleAuth}>
            <FcGoogle className="googleIcon"/>
            <p className="googleSignInInfo">Continue with Google</p>
            </div>
            <div className="guestLogin" onClick={guestLogin}>
            <p>Guest Login</p>
            </div>
            <p className="sectionDivider">or</p>
            <form className="signInForm" onSubmit={signInBtn}>
                <label htmlFor="emailId" className="emailLabel">Email</label>
                <input required type="email" name="emailId" id="emailId" className="emailInput" ref={refEmail}/>
                <label htmlFor="pwd" className="pwdLabel">Password</label>
                <input required type="password" name="pwd" id="pwd" className="pwdInput" ref=
                {refPassword}/>
                <button className="signInBtn">Sign In</button>
            </form>
            <div className="footer">
                <p>New to Chat App?</p>
                <Link to="/signUp" className="signUpLink">Sign up</Link>
            </div>
        </div>
        </div>
    )
}

export default SignIn
