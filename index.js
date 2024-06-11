const URL = "https://ca1cee33-bafc-422e-b286-7bf52f206284-00-2c9r22u7xggi0.riker.replit.dev"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAim6XVkbpql8usSXMqQkg96NRqTsucHjY",
  authDomain: "ejemploonline-77dd1.firebaseapp.com",
  projectId: "ejemploonline-77dd1",
  storageBucket: "ejemploonline-77dd1.appspot.com",
  messagingSenderId: "1035083684731",
  appId: "1:1035083684731:web:40fcbd6ac91150913dfbde",
  measurementId: "G-RSK5D72H0V"
};

let eventoDeInstalacion = null;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const showList = (list) => {
    const container = document.querySelector('.container');
    list.forEach(element => {
        container.innerHTML += `
            <div class="card horizontal">
                <div class="card-image">
                <img src="${element.image}">
                </div>
                <div class="card-stacked">
                <div class="card-content">
                    <p>
                    ${element.description}
                    </p>
                </div>
                <div class="card-action">
                    <a href="/detalles/?id=${element.id}">Conocer más</a>
                </div>
                </div>
            </div>
        `;
    });
}

const getList = async () => {
    const result = await fetch(`${URL}/list/`).then(data => data.json());
    showList(result.plants);
    const counter = result.plants.length;
    M.toast({html: `¡Se encontraron ${counter} plantas!`})
}

getList();

if(navigator?.serviceWorker) {
    navigator.serviceWorker.register('./sw.js').then((register) => {
        M.toast({html: `Modo offline activado`})
    })
    .catch((error) => {
        console.log("")
    })
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', ()=> {
    signInWithEmailAndPassword(auth, "sergiod.medina@davinci.edu.ar", "email1234")
      .then((userCredential) => {
        const user = userCredential.user;
        M.toast({html: `${user.email} logueado`})

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        M.toast({html: `${errorMessage}`})
      });
})

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt", e)
    eventoDeInstalacion = e;
    //acá puedo también mostrar
});

const installButton = document.getElementById("installButton");
installButton.addEventListener("click", () => {
    console.log("eventoDeInstalacion", eventoDeInstalacion);
    if(eventoDeInstalacion && eventoDeInstalacion.prompt) {
        eventoDeInstalacion.prompt()
        .then((resultado) => {
            const opcionesElegida = resultado.outcome;
            console.log("opcionesElegida", opcionesElegida)
            if(opcionesElegida == "dismissed") {
                console.log("Instalación cancelada");
            } else if(opcionesElegida == "accepted") {
                console.log("Instalación completa")
                ocultarBotonInstalacion();
            }
        })
        .catch((error) => console.log("error al instalar"))
    }
})

const ocultarBotonInstalacion = () => {
    installButton.style.display = "none";
}

setTimeout( () => {
    if(eventoDeInstalacion == null) {
        ocultarBotonInstalacion();
    }
}, 200);