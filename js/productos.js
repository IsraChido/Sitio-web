import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
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
const db = getDatabase();

var btnTodo = document.getElementById('todo');

var mostrarDatos = document.getElementById('mostrarTodo');

function mostrarTodo(){
    const db = getDatabase();
    const dbRef = ref(db, 'productos');
    onValue(dbRef, (snapshot) => {
        mostrarDatos.innerHTML=""
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            if(childData.estado == "0"){
                mostrarDatos.innerHTML = mostrarDatos.innerHTML+
                "<div class='column'>"+
                "<div>"+
                "<center>"+
                "<h1>"+ childData.nombre+" "+"$"+childData.precio+"/l"+"</h1>"+
                "<img src='"+childData.url+"' alt='"+childData.imgNombre+"'>"+
                "</center>"+
                "<h1>"+childData.descripcion+"</h1>"+
                "</div>"+
                "</div>"

            }
        });
    }, {
        onlyOnce: true
    });
}

btnTodo.addEventListener('click', mostrarTodo());