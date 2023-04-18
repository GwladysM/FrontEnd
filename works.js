// Récupération des projets depuis l'API :
fetch('http://localhost:5678/api/works')

const reponse = await fetch('http://localhost:5678/api/works');

//création de la constante works qui représente les projets de l'architecte :
const works = await reponse.json();

// Génération des éléments qui composent chaque projet de l'architecte :

function genererWorks(works){
    for(let i = 0; i < works.length; i++) {

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

genererWorks(works);


// Création des fonctions FILTER pour chaque boutton :

const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function() {
    const worksTous = works.filter(function(work) {
        return work.categoryId;
    });
    // Effacer la page pour la régénérer et afficher le bon filtre :
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksTous);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    const worksObjets = works.filter(function(work) {
        return work.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksObjets);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function() {
    const worksAppartements = works.filter(function(work) {
        return work.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksAppartements);
});

const boutonHotels = document.querySelector(".btn-hotels-restaurants");
boutonHotels.addEventListener("click", function() {
    const worksHotels = works.filter(function(work) {
        return work.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksHotels);
});