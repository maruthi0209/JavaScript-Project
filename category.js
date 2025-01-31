/**
 *  Code for Category page
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
    let category = getLocalStorage("category");
    let strCategory = document.createElement("div");
    strCategory.id = "strCategory";
    let strCategoryThumbContainer = document.createElement("div");
    strCategoryThumbContainer.id = "strCategoryThumbContainer";
    let strCategoryThumb = document.createElement("img");
    strCategoryThumb.innerHTML = `<img src=${category['strCategoryThumb']}`;
    strCategoryThumbContainer.appendChild(strCategoryThumb);
    let strCategoryDescription = document.createElement("div");
    strCategoryDescription.innerText = `${category['strCategoryDescription']}`;
    mainContainer.append(strCategory, strCategoryThumbContainer, strCategoryDescription);
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