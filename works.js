// Récupération des projets depuis l'API :
fetch('http://localhost:5678/api/works')

const reponse = await fetch('http://localhost:5678/api/works');

//
//création de la constante works qui représente les projets de l'architecte :
const works = await reponse.json();

//
// Génération des éléments qui composent chaque projet de l'architecte :

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const project = works[i];

        // Récupération de l'élt du DOM qui accueillera les projets :
        const divGallery = document.querySelector(".gallery");

        // Création d'une balise dédiée à un projet :
        const workElement = document.createElement("project");

        // Création des balises :
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = project.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = project.title;

        // Rattacher la balise projet à la div gallery :
        divGallery.appendChild(workElement);

        // Rattacher les balises au projet :
        workElement.appendChild(imageUrlElement);
        workElement.appendChild(titleElement);
    }

}

generateWorks(works);

//
// Création des fonctions FILTER pour chaque boutton :

const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function () {
    const worksTous = works.filter(function (work) {
        return work.categoryId;
    });
    // Effacer la page pour la régénérer et afficher le bon filtre :
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksTous);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
        return work.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksObjets);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function () {
    const worksAppartements = works.filter(function (work) {
        return work.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAppartements);
});

const boutonHotels = document.querySelector(".btn-hotels-restaurants");
boutonHotels.addEventListener("click", function () {
    const worksHotels = works.filter(function (work) {
        return work.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotels);
});

//
// Récupération du token :
const userToken = window.localStorage.getItem("token");

// Création du bouton Log-Out :
function logOut() {
    const logOut = document.getElementById("loginout");
    logOut.innerText = "logout";

    logOut.addEventListener("click", function () {
        localStorage.removeItem("token");
    });
};

// Création du Mode Edition :
function edition() {

    // Création de la bannière :
    const banner = document.getElementById("div1");

    const publierChgts = document.createElement('button')
    publierChgts.innerText = "publier les changements"
    publierChgts.style.color = "balck"
    publierChgts.style.backgroundColor = "white"
    publierChgts.style.borderRadius = "60px"
    publierChgts.style.border = "none"
    publierChgts.style.padding = "11px 23px"
    publierChgts.style.marginLeft = "580px"
    publierChgts.style.marginTop = "10px"
    publierChgts.style.position = "absolute"

    const modeEdition = document.createElement("p")
    modeEdition.innerText = "Mode édition"
    modeEdition.style.color = "white"
    modeEdition.style.backgroundColor = "black"
    modeEdition.style.marginLeft = "460px"
    modeEdition.style.paddingTop = "22px"
    modeEdition.style.position = "absolute"

    const iconeModif = document.createElement("img")
    iconeModif.src = "assets/icons/edit-white.png"
    iconeModif.style.position = "absolute"
    iconeModif.style.marginLeft = "430px"
    iconeModif.style.marginTop = "19px"
    iconeModif.style.backgroundColor = "black"

    banner.appendChild(iconeModif)
    banner.appendChild(modeEdition)
    banner.appendChild(publierChgts)


    // Création des 2 bouttons modifier :
    const div2 = document.getElementById("div2")

    const modeEditIntro = document.createElement("p")
    modeEditIntro.innerText = "modifier"
    modeEditIntro.style.position = "absolute"
    modeEditIntro.style.marginTop = "-30px"
    modeEditIntro.style.marginLeft = "90px"

    const iconeModifIntro = document.createElement("img")
    iconeModifIntro.src = "assets/icons/edit-black.png"
    iconeModifIntro.style.position = "absolute"
    iconeModifIntro.style.marginTop = "-33px"
    iconeModifIntro.style.marginLeft = "65px"

    div2.appendChild(modeEditIntro)
    div2.appendChild(iconeModifIntro)


    const div3 = document.getElementById("div3")

    const modeEditProj = document.createElement("a")
    modeEditProj.innerText = "modifier"
    modeEditProj.style.position = "absolute"
    modeEditProj.style.marginLeft = "725px"
    modeEditProj.style.marginTop = "9px"

    const iconeModifProj = document.createElement("img")
    iconeModifProj.src = "assets/icons/edit-black.png"
    iconeModifProj.style.position = "absolute"
    iconeModifProj.style.marginLeft = "700px"
    iconeModifProj.style.marginTop = "5px"

    div3.appendChild(modeEditProj)
    div3.appendChild(iconeModifProj)
}

// Suppression des boutons catégories en mode edition :
function suppCat() {
    const suppCat = document.querySelector(".categories")
    suppCat.style.display = "none"
}

if (userToken) {
    logOut();
    edition();
    suppCat();
}

// Création de la modale :
let modal = null

const openModal = function (e) {
    e.preventDefault()
    let modal = document.querySelector(e.target.getAttribute("href"))
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

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc"){
    closeModal(e)
    }
 })