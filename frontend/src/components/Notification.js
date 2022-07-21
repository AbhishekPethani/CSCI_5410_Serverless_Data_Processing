import React,{useState, useEffect} from 'react'
import {
    Typography,
  } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { initializeApp } from "firebase/app";
import {  getFirestore,  collection,  getDocs,  doc,  onSnapshot,} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyX8zOyHUWh4mQTHPtptcLEFVK1kIMhio",
  authDomain: "sdpproject-355718.firebaseapp.com",
  projectId: "sdpproject-355718",
  storageBucket: "sdpproject-355718.appspot.com",
  messagingSenderId: "954705569033",
  appId: "1:954705569033:web:6d04936f17041c21b65fd8"
};

const Notification = ({notifications, setNotifications}) => {
 
    const app = initializeApp(firebaseConfig)
    
    const db = getFirestore(app);

    const user_id = 'dv@gmail.com';

    useEffect(() => {
        if (user_id) {
          onSnapshot(collection(db, user_id), (doc) => {
            var messagesdict = doc.docs.map((doc) => doc.data());
            // console.log("Hello: ", messagesdict[0]['message']);
            var messages = []
            for (var i = 0; i < messagesdict.length; i++) {
                messages.push(messagesdict[i]['message'])
            }
            setNotifications(messages);
            console.log(messages);
            console.log(user_id);
          });
        }
    }, [db]);


    return (
    <div>{notifications.map((notification) => (
        <MenuItem key={notification} >
          <Typography textAlign="center">{notification}</Typography>
        </MenuItem>
      ))}</div>
  )
}

export default Notification