/**
 *  Code for Ingredient page
 */
window.addEventListener("load", () => {

    populateHeaderSection();
    populateMainContentSection();
    populateFooterSection();
     
});

function getLocalStorage(localStorageItem) {
    let localStorageData = JSON.parse(localStorage.getItem(localStorageItem));
    return localStorageData;
}

function populateHeaderSection() {
    let headerSection = document.getElementById("header");
    let logoContainer = document.createElement("div");
    logoContainer.id = "logoContainer";
    // let logoImage = document.createElement("img");
    // logoContainer.appendChild(logoImage);
    let searchbarContainer = document.createElement("div");
    searchbarContainer.id = "searchContainer";
    let searchBar = document.createElement("input");
    searchBar.type = "text";
    searchbarContainer.appendChild(searchBar);
    let navLinksContainer = document.createElement("div");
    navLinksContainer.id = "navLinksContainer";
    let loginLink = document.createElement("a");
    loginLink.href = "./index.html";
    loginLink.innerText = "Login";
    let cartLink = document.createElement("a");
    cartLink.href = "./cart.html";
    cartLink.innerText = "Cart";
    navLinksContainer.append(loginLink, cartLink);

    headerSection.append(logoContainer, searchbarContainer, navLinksContainer);
}

function populateMainContentSection() {
    let mainContainer = document.getElementById("mainContainer")
    let ingredient = getLocalStorage("ingredient");
    // console.log(ingredient);
    let ingredientMeal = document.createElement("div");
    ingredientMeal.id = "ingredientMeal";
    ingredientMeal.innerHTML = `${ingredient['strMeal']}`;
    let ingredientMealThumbContainer = document.createElement("div");
    ingredientMealThumbContainer.id = "ingredientMealThumbContainer";
    ingredientMealThumbContainer.innerHTML = `<img src=${ingredient['strMealThumb']}>`;

    mainContainer.append(ingredientMeal, ingredientMealThumbContainer);
}

function populateFooterSection() {
    let footerSection = document.getElementById("footer");
    let aboutContainer = document.createElement("div");
    aboutContainer.id = "aboutContainer";
    let contactContainer = document.createElement("div");
    contactContainer.id = "contactContainer";
    let copyright = document.createElement("div");
    copyright.id = "copyright";

    footerSection.append(aboutContainer, contactContainer, copyright);
}