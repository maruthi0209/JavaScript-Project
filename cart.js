/**
 *  Code for Cart page
 */

const prices = new Map([["andy", 49], ["roger", 69], ["gary", 89]]);
var items = [];

window.addEventListener("load", () => {
    populateHeaderSection();
    populateMainSection();
    populateFooterSection();
});

function populateHeaderSection() {
    let headerSection = document.getElementById("header");
    let logoContainer = document.createElement("div");
    logoContainer.id = "logoContainer";
    logoContainer.innerHTML = "<img src='./MyRecipeFinder.png'>"
    let searchbarContainer = document.createElement("div");
    searchbarContainer.id = "searchContainer";
    let searchBar = document.createElement("input");
    searchBar.type = "text";
    searchbarContainer.appendChild(searchBar);
    let navLinksContainer = document.createElement("div");
    navLinksContainer.id = "navLinksContainer";
    let homeLink = document.createElement("a");
    homeLink.href = "./home.html";
    homeLink.innerText = "Home";
    let userIcon = document.createElement("a");
    userIcon.href = "./index.html";
    userIcon.innerHTML = "<img src='./icons8-user-100.png'><figcaption>Log Out</figcaption>"; // https://img.icons8.com/?size=100&id=JesOX3f2LVdM&format=png&color=000000
    navLinksContainer.append(homeLink, userIcon);
    headerSection.append(logoContainer, searchbarContainer, navLinksContainer);
}

function populateMainSection() {
    let mainSection = document.getElementById("mainContainer");
    let sectionHeader = document.createElement("div");
    sectionHeader.id = "cartSectionHeader";
    sectionHeader.innerText = "Choose from our collection of best cookbooks!."
    let andyCooksContainer = document.createElement("div");
    andyCooksContainer.id = "andyCooksContainer";
    let garyMehiganContainer = document.createElement("div");
    garyMehiganContainer.id = "garyMehiganContainer";
    let uncleRogerContainer = document.createElement("div");
    uncleRogerContainer.id = "uncleRogerContainer";

    populateAndyCooksContainer(andyCooksContainer);
    populateGaryMehiganContainer(garyMehiganContainer);
    populateUncleRogerContainer(uncleRogerContainer);

    mainSection.append(sectionHeader, andyCooksContainer, garyMehiganContainer, uncleRogerContainer);
}

function populateAndyCooksContainer(andyCooksContainer) {
    let bookimageContainer = document.createElement("div");
    bookimageContainer.id = "bookImageContainer";
    bookimageContainer.innerHTML = `<a href="https://cookdinehost.com/products/andy-cooks-the-cookbook?utm_source=Website&utm_medium=Menu&utm_campaign=Cookbook"><img src="https://cookdinehost.com/cdn/shop/files/ANDYCOOKSFRONTCOVER_Edited.jpg?v=1693440960&width=1000"></a>`;
    let quantity = document.createElement("div");
    quantity.id = "andyquantity";
    let plusButton = document.createElement("button");
    plusButton.id = "andyplus";
    plusButton.innerText = " + ";
    let quantityDisplay = document.createElement("div");
    quantityDisplay.id = "quantityDisplay";
    quantityDisplay.innerHTML = ``;
    let minusButton = document.createElement("button");
    minusButton.id = "andyminus";
    minusButton.innerText = " - ";
    quantity.append(plusButton, quantityDisplay, minusButton);

    andyCooksContainer.append(bookimageContainer, quantity);
}

function populateGaryMehiganContainer(garyMehiganContainer) {
    let bookimageContainer = document.createElement("div");
    bookimageContainer.id = "bookImageContainer";
    bookimageContainer.innerHTML = `<a href="https://www.amazon.in/Favourites-Over-Recipes-Cook-Home/dp/1921383305"><img src="https://m.media-amazon.com/images/I/51e4jQDr8rL.jpg"></a>`;
    let quantity = document.createElement("div");
    quantity.id = "garyquantity";
    let plusButton = document.createElement("button");
    plusButton.id = "garyplus";
    plusButton.innerText = " + ";
    let quantityDisplay = document.createElement("div");
    quantityDisplay.id = "quantityDisplay";
    quantityDisplay.innerHTML = ``;
    let minusButton = document.createElement("button");
    minusButton.id = "garyminus";
    minusButton.innerText = " - ";
    quantity.append(plusButton, quantityDisplay, minusButton);

    garyMehiganContainer.append(bookimageContainer, quantity);
}

function populateUncleRogerContainer(uncleRogerContainer) {
    let bookimageContainer = document.createElement("div");
    bookimageContainer.id = "bookImageContainer";
    bookimageContainer.innerHTML = `<a href="https://www.amazon.com/Use-Your-Finger-rice-cooking/dp/B08VYR29FW"><img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSfU7F05Yn0WX0LvxK8qsh2gznBJcqE_S_YKCAImU9LRloXi7v0LDmPPvZXqiY8Wv0J5PzN"></a>`;
    let quantity = document.createElement("div");
    quantity.id = "rogerquantity";
    let plusButton = document.createElement("button");
    plusButton.id = "rogerplus";
    plusButton.innerText = " + ";
    let quantityDisplay = document.createElement("div");
    quantityDisplay.id = "quantityDisplay";
    quantityDisplay.innerHTML = ``;
    let minusButton = document.createElement("button");
    minusButton.id = "rogerminus";
    minusButton.innerText = " - ";
    quantity.append(plusButton, quantityDisplay, minusButton);

    uncleRogerContainer.append(bookimageContainer, quantity);
}

function populateFooterSection() {
    let footerSection = document.getElementById("footer");
    let aboutContainer = document.createElement("div");
    aboutContainer.id = "aboutContainer";
    aboutContainer.innerText = "Hi, My name is Sethu Maruthi and I'm the creator of My Recipe Finder. I live in Hyderabad and I like cooking various recipes that I come across during my travels to various new places. Hope you find a recipe that touches your heart and fills you with joy. ";
    let contactContainer = document.createElement("div");
    contactContainer.id = "contactContainer";
    contactContainer.innerText = "I live in Hyderabad, India. You can reach out to me at sethumaruthi93@gmail.com."
    let copyright = document.createElement("div");
    copyright.id = "copyright";
    copyright.innerText = ` &copy; copyright 2025. All rights reserved.`;

    footerSection.append(aboutContainer, contactContainer, copyright);
}

