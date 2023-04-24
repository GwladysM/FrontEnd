// -> importer les infos de l'api (+ userId et Token)
// -> SI identifiant ok alors la page s'ouvre
// SINON
// -> SI identifiant pas OK alors mettre un msg d'erreur
// -> connexion ok, alors rediriger vers page index.html
function authentification() {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
        .then((response) => response.json())
//        .then((data) => {
//            localStorage.setItem("token", data.token);
//            window.location.href = "index.html";
//        })
};

const seConnecter = document.getElementById("loginform");
seConnecter.addEventListener("submit", (event) => {
    event.preventDefault();
    authentification();
//    if (token == true) {
//        console.log("connexion ok");
//    } else {
//        console.log("identifiant ou mot de passe incorrect");
//    }
});