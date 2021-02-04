import React from "react";
import Router from "./src/routes/Router";
import BrowserRouter from "react-router-dom";
import { fireabase as firebaseInit } from "./src/components/commoncomponents/firebase/myfirebase";
import firebase from "firebase/app";
import "firebase/messaging";
let pushToken;
  const messaging = firebase.messaging();
  messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log("FCM token> ", currentToken);
        pushToken = currentToken;
      } else {
        console.log("No Token available");
      }
    })
    .catch((error) => {
      console.log("An error ocurred while retrieving token. ", error);
    });

  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    const { title, ...options } = payload.notification;
    navigator.serviceWorker.register("firebase-messaging-sw.js");
    function showNotification() {
      Notification.requestPermission(function (result) {
        if (result === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(payload.notification.title, {
              body: payload.notification.body,
              tag: payload.notification.tag,
            });
          });
        }
      });
    }
    showNotification();
  });
export default function App() {
 
  
  return <Router />;
}
