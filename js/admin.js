import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase, onValue, ref, set, child, get, update, remove }
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import { getStorage, ref as refS, uploadBytes, getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"

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

var btnGuardar = document.getElementById('guardar');
var btnConsultar = document.getElementById('consultar');
var btnActualizar = document.getElementById('actualizar');
var btnDeshabilitar = document.getElementById('deshabilitar');
var btnHabilitar = document.getElementById('habilitar');
var btnMostrarImagen = document.getElementById('verImagen');
var archivo = document.getElementById('archivo');
var btnLimpiar = document.getElementById('limpiar');
var imagenCambio = document.getElementById('imagenAdmin');
var urlCambio = document.getElementById('url');
var btnTodo = document.getElementById('todo');

var mostrarDatos = document.getElementById('mostrarTodo');

var codigo = "";
var nombre = "";
var descripcion = "";
var precio = "";
var url = "";
var estado = "";
var imgNombre = "";


function escribirInputs() {
    document.getElementById('codigo').value = codigo;
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    document.getElementById('url').value = url;
    document.getElementById('estado').value = estado;
    document.getElementById('imgNombre').value = imgNombre;
}

function leerInputs() {
    codigo = document.getElementById('codigo').value;
    nombre = document.getElementById('nombre').value;
    descripcion = document.getElementById('descripcion').value;
    precio = document.getElementById('precio').value;
    url = document.getElementById('url').value;
    estado = document.getElementById('estado').value;
    imgNombre = document.getElementById('imgNombre').value;
}
  
function guardar() {
    leerInputs();
    if(document.getElementById('codigo').value == 0 || document.getElementById('nombre').value == 0 || document.getElementById('precio').value == 0 || document.getElementById('descripcion').value == 0 || document.getElementById('url').value ==0 || document.getElementById('imgNombre').value == 0){
        alert("Te falta seleccionar un campo")
    }else{
        set(ref(db,'productos/' + codigo),{
            nombre:nombre,
            descripcion:descripcion,
            precio:precio,
            url:url,
            estado:estado="0",
            imgNombre:imgNombre
        }).then((docRef)=>{
            alert("Se agregó el producto con éxito");
            consultar();
        }).catch((error)=>{

            alert("Surgió un eror " + error);

        })
    }
}

function consultar(){
    leerInputs();
    const dbref = ref(db);
    if(codigo == ""){
        alert("Introduce un código primero");
    }else{
        get(child(dbref,'productos/' + codigo)).then((snapshot)=>{
            if (snapshot.exists()){
                nombre = snapshot.val().nombre;
                descripcion = snapshot.val().descripcion;
                precio = snapshot.val().precio;
                url = snapshot.val().url;
                estado = snapshot.val().estado;
                imgNombre = snapshot.val().imgNombre;
                escribirInputs();
            } else {
                alert("No existe el producto");
                nombre = "";
                descripcion = "";
                precio = "";
                url = "";
                estado = "";
                imgNombre = "";
                escribirInputs();
            }
        }).catch((error)=>{
            alert("Surgió un error " + error);
        })
    }
}

function actualizar(){
    leerInputs();
    if(document.getElementById('codigo').value == 0 || document.getElementById('nombre').value == 0 || document.getElementById('precio').value == 0 || document.getElementById('descripcion').value == 0 || document.getElementById('url').value ==0 || document.getElementById('imgNombre').value == 0){
        alert("Te falta seleccionar un campo")
    }else{
        update(ref(db,'productos/' + codigo), {
            nombre:nombre,
            descripcion:descripcion,
            precio:precio,
            url:url,
            estado:estado
        }).then(()=>{
            alert("Se realizó la actualización");
        }).catch(()=>{
            alert("Surgió un error " + error);
        })
    }
}

function deshabilitar(){
    if(estado == "0"){
        consultar();
        estado = "1";
        const dbref = ref(db);
        get(child(dbref,'productos/' + codigo)).then((snapshot)=>{
            if (snapshot.exists()){
                estado = snapshot.val().estado;
                escribirInputs();
            }
        })
        update(ref(db,'productos/'+ codigo),{
               estado:estado
        }).then(()=>{
            alert("Se deshabilitó");
        }).catch(()=>{
            alert("Surgió un error " + error);
        })
        consultar();
    }else{
        alert("No hay nada a que cambiar el estado o ya está inhabilitado");
    }
}

function habilitar(){
    if(estado == "1"){
        estado = "0";
        const dbref = ref(db);
        get(child(dbref,'productos/' + codigo)).then((snapshot)=>{
            if (snapshot.exists()){
                estado = snapshot.val().estado;
                escribirInputs();
            }
        })
        update(ref(db,'productos/'+ codigo),{
            estado:estado
        }).then(()=>{
            alert("Se habilitó");
        }).catch(()=>{
            alert("Surgió un error " + error);
        })
        consultar();
    }else{
        alert("No hay nada a que cambiar el estado o ya está habilitado");
    }
}

function descargarImagen(){
    archivo = document.getElementById('imgNombre').value;
    // Create a reference to the file we want to download
    const storage = getStorage();
    const storageRef = refS(storage, 'sitioWeb/' + archivo);

    // Get the download URL
    getDownloadURL(storageRef)
    .then((url) => {
        document.getElementById('url').value = url;
        document.getElementById('imagen').src = url;
    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/object-not-found':
            console.log("No existe el archivo")
            break;
        case 'storage/unauthorized':
            console.log("No tiene permisos")
            break;
        case 'storage/canceled':
            console.log("Se canceló o no tiene internet")
            break;

        // ...

        case 'storage/unknown':
            console.log("No sé que pasó :()")
            break;
        }
    });
}

function cargarImagen(){
    // Archivo seleccionado
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    
    const storage = getStorage();
    const storageRef = refS(storage, 'sitioWeb/' + name);
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        document.getElementById('imgNombre').value = name;
        alert('Se cargó el archivo'); 
    }).then(()=>{
        descargarImagen();
    });
}

function limpiar(){
    leerInputs();
    codigo = "";
    nombre = "";
    descripcion = "";
    precio = "";
    url = "";
    estado = "";
    imagenCambio.innerHTML = `<img src="/img/nievesHeader.jpg" alt="" id="imagen"></img>`
    imgNombre = "";
    mostrarDatos.innerHTML = "";
    escribirInputs();
}

function mostrarTodo(){
  
    const db = getDatabase();
    const dbRef = ref(db, 'productos');
    onValue(dbRef, (snapshot) => {
        mostrarDatos.innerHTML=""
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            mostrarDatos.innerHTML = mostrarDatos.innerHTML+
            "<div class='column'>"+
            "<div>"+
            "<h1>" + childKey + "</h1>"+
            "<h1>"+ childData.nombre+"</h1>"+
            "<img src='"+childData.url+"' alt='"+childData.imgNombre+"'>"+
            "<p>"+childData.precio+"</p>"+
            "<p>"+childData.descripcion+"</p>"+
            "<p>"+childData.estado+"</p>"+
            "</div>"+
            "</div>"

        });
    });
}

btnGuardar.addEventListener('click', guardar);
btnConsultar.addEventListener('click', consultar);
btnActualizar.addEventListener('click', actualizar);
btnDeshabilitar.addEventListener('click', deshabilitar);
btnHabilitar.addEventListener('click', habilitar);
archivo.addEventListener('change', cargarImagen);
btnMostrarImagen.addEventListener('click', descargarImagen);
btnLimpiar.addEventListener('click', limpiar);
urlCambio.addEventListener('change', cargarImagen);
btnTodo.addEventListener('click', mostrarTodo);