// Création de la fonction d'autentification :
async function authentification() {
    const user = {
        email: email.value,
        password: password.value
    }
 
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    const userToken = data.token;
    // SI identifiant et mot de passe OK,
    // ALORS enregitrer token + redirection page index.html
    // SINON afficher msg erreur
    if (userToken) {
        localStorage.setItem("token", userToken);
        window.location.href = "index.html";
    } else {
        alert("Erreur dans l’identifiant ou le mot de passe");
    }
};


// Création de l'évènement authentification et retour page d'accueil en mode admin :
const logIn = document.getElementById("loginform");
logIn.addEventListener("submit", (event) => {
    event.preventDefault();
    authentification();
});