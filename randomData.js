/**
 *  Code for randomData
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
    let randomData = getLocalStorage("randomData");
    localStorage.removeItem("randomData");// console.log(randomData); 
    let randomName = document.createElement("div");
    randomName.id = "randomName";
    randomName.innerText = `${randomData['strMeal']}`;
    let randomCategory = document.createElement("div");
    randomCategory.id = "randomCategory";
    randomCategory = `${randomData['strCategory']}`;
    let randomArea = document.createElement("div");
    randomArea.id = "randomArea";
    randomArea.innerText = `${randomData['strArea']}`;
    let randomInstructions = document.createElement("div");
    randomInstructions.id = "randomInstructions";
    randomInstructions.innerText = `${randomData['strInstructions']}`;
    let randomThumb = document.createElement("div");
    randomThumb.id = "randomThumb";
    randomThumb.innerHTML = `${randomData['strYoutube']}`;
    let randomSource = document.createElement("div");
    randomSource.id = "randomSource";
    randomSource.innerHTML = `${randomData['strSource']}`;
    let randomIngredients = createIngredientsMap(randomData);
    
    mainContainer.append(randomName, randomCategory, randomThumb, randomArea, randomInstructions, randomIngredients, randomSource);
}

function createIngredientsMap(randomData) {
    let ingredientsMap = new Map();
    for(let i=0; i<7; i++) {
        ingredientsMap.set(Object.values(randomData)[9+i], Object.values(randomData)[29+i]);
    }
    let randomIngredients = document.createElement("div");
    randomIngredients.id = "randomIngredients";
    let ingredientsTable = document.createElement("table");
    let tableHeaderRow = document.createElement("tr");
    let tableIngredientColumn = document.createElement("th");
    tableIngredientColumn.id = "tableIngredientColumn";
    tableIngredientColumn.innerText = "Ingredients";
    let tableQuantityColumn = document.createElement("th");
    tableQuantityColumn.id = "tableQuantityColumn";
    tableQuantityColumn.innerText = "Quantity";
    tableHeaderRow.append(tableIngredientColumn, tableQuantityColumn);
    ingredientsTable.append(tableHeaderRow);
    ingredientsMap.forEach((value, key) => {
        let ingredientRow = document.createElement("tr");
        let ingredientColumn = document.createElement("td");
        ingredientColumn.textContent = `${key}`;
        let quantityColumn = document.createElement("td");
        quantityColumn.textContent = `${value}`;
        ingredientRow.append(ingredientColumn, quantityColumn);
        ingredientsTable.appendChild(ingredientRow);
    });
    return randomIngredients.appendChild(ingredientsTable);
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