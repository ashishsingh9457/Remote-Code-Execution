 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
 const firebaseConfig = {
    apiKey: "AIzaSyAWgsctVlDdrb4Evt1FYWNQdWl1DhQ5ha4", 
    authDomain: "remoteexe-77fe4.firebaseapp.com",
    projectId: "remoteexe-77fe4",
    storageBucket: "remoteexe-77fe4.appspot.com",
    messagingSenderId: "402941248452",
    appId: "1:402941248452:web:7376a50b516c7a929f1a91",
    measurementId: "G-B90J54ZSJC",
};



 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 //const analytics = getAnalytics(app);
 const auth = getAuth(app);

 //Input email
 
 const submit = document.getElementById('submit');
 submit.addEventListener("click", function(Event){
     Event.preventDefault();
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        alert("Account Exists...")
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
 })
