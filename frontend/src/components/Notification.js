import React,{useState, useEffect} from 'react'
import {
    Typography,
  } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { initializeApp } from "firebase/app";
import {  getFirestore,  collection,  getDocs,  doc,  onSnapshot,} from "firebase/firestore";

const firebaseConfig = {
  // add config 
};

const Notification = ({notifications, setNotifications}) => {
 
    const app = initializeApp(firebaseConfig)
    
    const db = getFirestore(app);

    const user_id = 'dv@gmail.com';

    useEffect(() => {
        if (user_id) {
          onSnapshot(collection(db, user_id), (doc) => {
            var messagesdict = doc.docs.map((doc) => doc.data());
            console.log("Hello: ", messagesdict[0]['message']);
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