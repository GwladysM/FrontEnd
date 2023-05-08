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
    banner.style.marginTop = "0"
    banner.style.backgroundColor = "black"
    banner.style.height = "60px"
    banner.style.width = "100vw"
    banner.style.marginLeft = "calc(-1 * ((100vw - 100%) / 2))"
    banner.style.display = "flex"
    banner.style.justifyContent = "center"
    banner.style.alignItems = "center"

    const publierChgts = document.querySelector("p")
    publierChgts.innerText = "publier les changements"
    publierChgts.style.backgroundColor = "white"
    publierChgts.style.borderRadius = "60px"
    publierChgts.style.border = "none"
    publierChgts.style.padding = "11px 23px"
    publierChgts.style.margin = "0px 5px"

    const modeEdition = document.createElement("p")
    modeEdition.innerText = "Mode édition"
    modeEdition.style.color = "white"
    modeEdition.style.backgroundColor = "black"
    modeEdition.style.margin = "0px 5px"

    const iconeModif = document.createElement("img")
    iconeModif.src = "assets/icons/edit-white.png"
    iconeModif.style.backgroundColor = "black"
    iconeModif.style.margin = "0px 5px"

    banner.appendChild(iconeModif)
    banner.appendChild(modeEdition)
    banner.appendChild(publierChgts)


    // Création du bouton modifier introduction :

    const div2 = document.getElementById("div2")
    div2.style.display = "flex"
    div2.style.justifyContent = "flex-start"
    div2.style.alignItems = "center"
    div2.style.gap = "5px"
    div2.style.margin = "55px"
    div2.style.marginTop = "-40px"

    const iconeModifIntro = document.createElement("img")
    iconeModifIntro.src = "assets/icons/edit-black.png"

    const modeEditIntro = document.createElement("p")
    modeEditIntro.innerText = "modifier"

    div2.appendChild(iconeModifIntro)
    div2.appendChild(modeEditIntro)


    // Création du bouton modifier projets :

    const div3 = document.getElementById("div3")
    div3.style.display = "flex"
    div3.style.justifyContent = "end"
    div3.style.alignItems = "center"
    div3.style.gap = "5px"
    div3.style.marginBottom = "50px"
    div3.style.marginTop = "-50px"
    div3.style.marginRight = "180px"

    const iconeModifProj = document.createElement("img")
    iconeModifProj.src = "assets/icons/edit-black.png"

    const modeEditProj = document.querySelector('.js-modal')
    modeEditProj.innerText = "modifier"

    div3.appendChild(iconeModifProj)
    div3.appendChild(modeEditProj)
}

// Suppression des boutons catégories en mode edition :
function suppCat() {
    const suppCat = document.querySelector(".categories")
    suppCat.style.display = "none"
}

// Affichage du mode édition :

if (userToken) {
    logOut();
    edition();
    suppCat();
}

// Création de la modale :

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

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

// Intégration des projets à la modale :

function galerieWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const project = works[i];

        // Récupération de l'élt du DOM qui accueillera les projets :
        const listGalerie = document.querySelector(".list-galerie")
        listGalerie.style.display = "grid"
        listGalerie.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
        listGalerie.style.width = "100%"
        listGalerie.style.height = "100%"

        // Création d'une balise dédiée à un projet :
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

        const moveElement = document.createElement("img")
        moveElement.src = "assets/icons/move.png"
        moveElement.style.display = "none"
        //    function moveImg() {
        //        moveElement.style.display = null
        //    }
        //    imageUrlElement.addEventListener("click", moveImg)

        const trushElement = document.createElement("img")
        trushElement.src = "assets/icons/trush.png"
        trushElement.style.position = "absolute"
        trushElement.style.zIndex = "2"
        trushElement.style.left = "60px"
        trushElement.style.top = "5px"

        workElement.appendChild(imageUrlElement);
        workElement.appendChild(titleElement);
        workElement.appendChild(moveElement);
        workElement.appendChild(trushElement);

        trushElement.addEventListener("click", function() {
            
        })

        //function deleteProject() {
//
        //    const response = fetch("http://localhost:5678/api/works/[i]", {
        //        method: "DELETE",
        //        headers: {
        //            'accept: */*',
        //            'Authorization: Bearer'
        //    },
        //    })
        //}
    }
}
galerieWorks(works);