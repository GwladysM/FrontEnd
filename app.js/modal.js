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
        imageUrlElement.addEventListener("mouseover", function(event){
            moveElement.style.display = null 
            setTimeout(function() {
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
    fetch("http://localhost:5678/api/works/"+id, {
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
    modal2.querySelector(".js-modal2-close").addEventListener("click", closeModal2)
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
    closeModal(e)
}
if (modal2) {
    modal2.getElementById("btn-back").addEventListener("click", console.log("ok"))
}


// Click sur modale 2 :
document.querySelectorAll(".js-modal2").forEach(input => {
    input.addEventListener("click", openModal2)
    })

