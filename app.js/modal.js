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

// Click sur modale 1 :
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

// Intégration des projets à la modale :

const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

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

        const titleElement = document.createElement("h3");
        titleElement.innerText = "éditer";
        titleElement.style.fontSize = "12px"
        titleElement.style.margin = "0"
        titleElement.style.position = "absolute"
        titleElement.style.zIndex = "1";
        titleElement.style.top = "105px";
        titleElement.style.left = "7px";

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
        let trashElement = document.createElement("img")
        trashElement.src = "assets/icons/trush.png"
        trashElement.style.position = "absolute"
        trashElement.style.zIndex = "2"
        trashElement.style.left = "60px"
        trashElement.style.top = "5px"

        workElement.appendChild(imageUrlElement);
        workElement.appendChild(titleElement);
        workElement.appendChild(moveElement);
        workElement.appendChild(trashElement);

        const id = project.id;

        trashElement.addEventListener("click", function () {
            //alert("voulez-vous supprimer ce projet ?")
            deleteWork(id);
        })
    }
}
galerieWorks(works);


// Récupération du token :
const userToken = window.localStorage.getItem("token");

// Création de la fonction suppression d'un projet :

function deleteWork(id) {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            'accept': '*/*',
            'Authorization': 'Bearer' + " " + userToken,
            'Content-type': 'application/json'
        },
    })
}

// Création de la DEUXIEME modale, ajout d'un projet : 
let modal2 = null

const openModal2 = function (e) {
    e.preventDefault()
    modal2 = document.querySelector(e.target.getAttribute("href"))
    modal2.style.display = null
    modal2.removeAttribute("aria-hidden")
    modal2.setAttribute("aria-modal", "true")
    modal2.addEventListener("click", closeModal2)
    modal2.querySelector(".back").addEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation)
}

const closeModal2 = function (e) {
    if (modal2 === null) return
    e.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute("aria-hidden", "true")
    modal2.removeAttribute("aria-modal")
    modal2.removeEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-close").removeEventListener("click", closeModal2)
    modal2.querySelector(".js-modal2-stop").removeEventListener("click", stopPropagation)
    modal2 = null
}


// Bouton ouvrir la modale 2 "ajouter une photo" :
document.querySelectorAll(".js-modal2").forEach(input => {
    input.addEventListener("click", openModal2)
})

// Bouton fermer modale 1 et modale 2 :
document.querySelectorAll(".js-modal2-close").forEach(input => {
    input.addEventListener("click", closeModal2)
    input.addEventListener("click", closeModal)
})


// MISE EN PLACE DU FORMULAIRE D'AJOUT PROJET : //

const imgUpload = document.querySelector("#img-upload");
imgUpload.addEventListener("change", previewFile);

function previewFile() {
    const fileExtRegex = /\.(jpg|png)$/i;
    if (this.files.length === 0 || !fileExtRegex.test(this.files[0].name)) {
        return;
    }

    const file = this.files[0];

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.addEventListener("load", (event) => displayImage(event, file));
}

function displayImage(event, file) {
    const divElement = document.querySelector(".img-add")

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

const formData = new FormData();
formData.append("title", title.value);
formData.append("imageUrl", imageUrl.value);
formData.append("categoryId", categoryId.value)

const request = new XMLHttpRequest();
request.open("POST", "http://localhost:5678/api/works/");
request.send(formData);

function addProject() {
    fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer' + " " + userToken,
            'Content-Type': 'multipart/form-data',
        },
    })
}

const sendWork = document.querySelector("#valid");
sendWork.addEventListener("click", console.log("OK"))