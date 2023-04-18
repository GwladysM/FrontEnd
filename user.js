// -> importer les infos de l'api (userId et Token)
// -> mettre une function sur le submit 
// -> SI identifiant ok alors la page s'ouvre
// SINON
// -> SI identifiant pas OK alors mettre un msg d'erreur
// -> connexion ok, alors rediriger vers page index.html

// Exportation de la page de connexion :
//export function ajoutListenerConnexion() {
//    const pageConnexion = document.querySelector(".pageConnexion"),
//    pageConnexion.addEventListener("submit", function(event){

//    });
//};

// Création de la variable et envoi de la demande de connexion :
let user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie',
    userId: 1,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
};

let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
});
if(response.ok) {
    const json = await response.json();
} else {
    alert("HTTP-Error: " + response.status);
};