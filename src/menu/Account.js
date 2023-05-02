import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserSessionPersistence, browserLocalPersistence, } from 'firebase/auth';
import google_normal from './icons/google_normal.png';
import google_focus from './icons/google_focus.png';
import google_pressed from './icons/google_pressed.png';
import "./Account.css";
import { CheckBox } from '@mui/icons-material';
import { Checkbox } from '@mui/material';


export const localUserData = () => {
  for (const key of Object.keys(localStorage)) {
    try{
      if (key.includes('firebase:authUser:')) {
        return JSON.parse(localStorage.getItem(key));
      }
    } catch (error){
        alert("비정상적인 접근 입니다.");
        localStorage.removeItem('firebase:authUser:');
    }
    
  }
  return null;
}; 

const Account = () => {
  const [userInfo, setUserInfo] = useState('');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  console.log(userInfo);

  
  const handleGoogleLogin = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
          .then(result => {
            setUserInfo(result.user);
            localStorage.setItem('firebase:authUser:', JSON.stringify(result.user));
            window.location.reload();
          })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGoogleLogout = () => {
    localStorage.removeItem('firebase:authUser:');
    signOut(auth)
      .then(() => {
      window.location.reload();
    })
      .catch(error => {
      console.log(error);
    });
  };
  
  if(localUserData() == null){
    return (
      <div>
        <span>로그인</span><br/>
        <button id="social_login" onClick={handleGoogleLogin} >
        <img id="login_google" src={google_normal} alt="Your image description"/>
        </button>
      </div>
    );
  }
  else{
    return (
      <div>
          <button id="social_logout" onClick={handleGoogleLogout}>로그아웃</button>
      </div>
    );
  }
  
};

export default Account;