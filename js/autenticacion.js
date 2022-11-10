import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from 
"https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getDatabase, onValue, ref, set, child, get, update, remove }
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"


const firebaseConfig = {
  apiKey: "AIzaSyCEEt24uQaKvkvrRhPLddqI_q6NCFqQY_Y",
  authDomain: "sitio-web-ed392.firebaseapp.com",
  databaseURL: "https://sitio-web-ed392-default-rtdb.firebaseio.com",
  projectId: "sitio-web-ed392",   
  storageBucket: "sitio-web-ed392.appspot.com",
  messagingSenderId: "893792021036",
  appId: "1:893792021036:web:51f41a7d480345e96bbf89"
};

const app= initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

login.addEventListener("click",(e) => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    const dt = new Date();
    update(ref(database, "users/" + user.uid),{
        last_login: dt

        
    })
    window.location.href = "/html/administrador.html" 
    alert("Ingreso exitoso");
    
  })
   
  .catch((error) => {
    const errorMessage = error.message;
    alert("Hubo un error" + errorMessage);
  });
})