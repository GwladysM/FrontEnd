import { generateWorks } from "./works.js";
// Récupération du token :
const userToken = window.localStorage.getItem("token");
//
// Création de la PREMIERE modale :
let modal = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}
//
// Click sur modale 1 :
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})
//
// Intégration des projets à la modale :
let works = [];
const reponse = await fetch('http://localhost:5678/api/works');
works = await reponse.json();

let trashElement;
let id;

function galerieWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const project = works[i];

        // Récupération de l'elt du dom qui accueil les projets :
        const listGalerie = document.querySelector(".list-galerie")
        listGalerie.style.display = "grid"
        listGalerie.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
        listGalerie.style.width = "100%"
        listGalerie.style.height = "100%"

        // Création de chaque projet :
        const workElement = document.createElement("project");
        workElement.style.position = "relative"
        workElement.style.display = "grid"
        workElement.style.justifyItems = "center"

        listGalerie.appendChild(workElement);

        // Création des balises :
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = project.imageUrl;
        imageUrlElement.style.width = "76px"
        imageUrlElement.style.position = "absolute"
        imageUrlElement.style.zIndex = "1"

        const editElement = document.createElement("h3");
        editElement.innerText = "éditer";
        editElement.style.fontSize = "12px"
        editElement.style.margin = "0"
        editElement.style.position = "absolute"
        editElement.style.zIndex = "1";
        editElement.style.top = "105px";
        editElement.style.left = "13%";

        // Icone déplacer :
        const moveElement = document.createElement("img")
        moveElement.src = "assets/icons/move.png"
        moveElement.style.display = "none"
        moveElement.style.position = "absolute"
        moveElement.style.zIndex = "2"
        moveElement.style.left = "40px"
        moveElement.style.top = "5px"

        // Affichage de l'icone déplacer :
        imageUrlElement.addEventListener("mouseover", function (event) {
            moveElement.style.display = null
            setTimeout(function () {
                moveElement.style.display = "none";
            }, 500);
        }, false);

        // Icone supprimer :
        trashElement = document.createElement("img")
        trashElement.src = "assets/icons/trash.png"
        trashElement.style.position = "absolute"
        trashElement.style.zIndex = "2"
        trashElement.style.right = "16%"
        trashElement.style.top = "5px"

        workElement.appendChild(imageUrlElement);
        workElement.appendChild(editElement);
        workElement.appendChild(moveElement);
        workElement.appendChild(trashElement);

        id = project.id;
    }
}
galerieWorks(works);

//
// Création de la fonction suppression d'un projet :
async function deleteWork(id) {
    try {
        await fetch("http://localhost:5678/api/works/" + id, {
            method: "DELETE",
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer' + " " + userToken,
                'Content-type': 'application/json'
            },
        })
    } catch (error) {
        console.error(error)
    }
};

// Création de l'évènement suppression et actualisation du dom :
trashElement.addEventListener("click", function () {
    if (window.confirm("Voulez-vous supprimer ce projet ?")) {
        deleteWork(id);
    }
    const worksMaj = works.filter(function (work) {
        return work.id !== id;
    });
    document.querySelector(".list-galerie").innerHTML = '';
    galerieWorks(worksMaj);
    document.querySelector(".gallery").innerHTML = '';
    generateWorks(worksMaj);
    console.log("Ajouter une boucle pour pouvoir supprimer plusieurs projets à la suite ?");
});

//
// Création de la DEUXIEME modale, ajout d'un projet : 
let modal2 = null

const openModal2 = function (event) {
    event.preventDefault()
    modal2 = document.querySelector(event.target.getAttribute("href"))
    modal2.style.display = null
    modal2.removeAttribute("aria-hidden")
    modal2.setAttribute("aria-modal", "true")
    modal2.addEventListener("click", closeModal2)
    modal2.addEventListener("click", closeModal)
    modal2.querySelector(".js-modal2-back").addEventListener("click", backModal)
    modal2.querySelector(".js-modal2-close").addEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation)
    }

const closeModal2 = function (event) {
    if (modal2 === null) return
    event.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute("aria-hidden", "true")
    modal2.removeAttribute("aria-modal")
    modal2.removeEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-close").removeEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-close").removeEventListener("click", closeModal)
    modal2.querySelector(".js-modal2-stop").removeEventListener("click", stopPropagation)
    document.getElementById("form-add").reset();
    resetImgForm();
    modal2 = null
}

const backModal = function (event) {
    event.preventDefault()
    modal.style.display = null
    modal2.style.display = "none"
}

//
// Bouton ouvrir la modale 2 "ajouter une photo" :
document.querySelectorAll(".js-modal2").forEach(input => {
    input.addEventListener("click", openModal2)
})


//// MISE EN PLACE DU FORMULAIRE D'AJOUT PROJET : ////

const imgUpload = document.querySelector("#img-upload");
imgUpload.addEventListener("change", previewFile);

// Création de la fonction prévisualisation de l'image chargée :
let file;
function previewFile() {
    const fileExtRegex = /\.(jpg|png)$/i;
    if (this.files.length === 0 || !fileExtRegex.test(this.files[0].name)) {
        return;
    }
    file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => displayImage(event, file));
}

// Affichage de la photo du projet à la place du logo et "+ ajouter photo" :
const divElement = document.querySelector(".img-add")

function displayImage(event, file) {

    const imageElement = document.createElement("img");
    imageElement.src = event.target.result;
    imageElement.style.height = "100%";

    const logoElement = document.querySelector("#logo")
    const btnElement = document.querySelector("#btn-img-upload")
    const pElement = document.querySelector("#p")

    divElement.appendChild(imageElement)
    divElement.appendChild(logoElement)
    divElement.appendChild(btnElement)
    divElement.appendChild(pElement)

    logoElement.style.display = "none"
    btnElement.style.display = "none"
    pElement.style.display = "none"
}

// Fonction pour vider la prévisualisation de l'image :
function resetImgForm() {
    console.log("Ajouter quelque chose pour vider la partie image du formulaire");
}

//////////////////////////////////////////////////////////
// Création de la fonction ajout d'un nouveau projet :
const category = document.getElementById("chose-cat");
async function addProject() {

    // Création de l'objet formData :
    let formData = new FormData();
    formData.append("title", title.value);
    formData.append("image", file);
    formData.append("category", category.value);

    //Test bonnes infos dans formulaire :
    //for (var pair of formData.entries()) {
    //    console.log(pair[0] + ',' + pair[1]);
    //}

    // Appel à fetch :
    try {
        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: formData
        });
    } catch (error) {
        console.error(error);
    };
};

const sendProject = document.getElementById("valid");
sendProject.addEventListener("click", async (event) => {
    event.preventDefault();
    if (title.value === "" || category.value === "" || imgUpload.value === "") {
        alert("Veuillez remplir tous les champs");
    } else {
        sendProject.style.backgroundColor = "#1D6154";
        console.log("tout est ok");
    }
    await addProject();

    // Attendre un court délai pour permettre à l'opération d'ajout de se terminer
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mettre à jour la liste `works` en récupérant les projets depuis le serveur
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (response.ok) {
            works = await response.json();
            // Effacer la page pour la régénérer et afficher le nouveau projet :
            document.querySelector(".gallery").innerHTML = "";
            generateWorks(works);
        } else {
            console.error("Une erreur s'est produite lors de la récupération des projets depuis le serveur");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des projets depuis le serveur", error);
    }
    closeModal2(event);
    closeModal(event);
});