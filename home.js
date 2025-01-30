/**
 * Code for Home page
 */
const categoryURL = "https://pricey-atom-muskox.glitch.me/categories";
const ingredientURL = "https://pricey-atom-muskox.glitch.me/ingredient";
const randomURL = "https://pricey-atom-muskox.glitch.me/random";
const alphabetURL = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const alphabetArray = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));  // source : https://hasnode.byrayray.dev/how-to-generate-an-alphabet-array-with-javascript
const areaURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const listOfCountries = new Map([["American", 'https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png'], // source : https://www.countryflags.com/
["British", 'https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png'], 
["Canadian", 'https://www.countryflags.com/wp-content/uploads/canada-flag-png-large.png'], 
["French", 'https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png'], 
["Spanish", 'https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png'], 
["Italian", 'https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png'], 
["Japanese", 'https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png'], 
["Greek", 'https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png'], 
["Turkish", 'https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png'], 
["Russian", 'https://www.countryflags.com/wp-content/uploads/russia-flag-png-large.png'], 
["Indian", 'https://www.countryflags.com/wp-content/uploads/india-flag-png-large.png'], 
["Chinese", 'https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png'], 
["Mexican", 'https://www.countryflags.com/wp-content/uploads/mexico-flag-png-large.png']]);

window.addEventListener("load", () => {
    populateHeaderSection();
    populateMainSection();
    populateFooterSection();
})

async function getData(URL) {
    let responseData;
    try {
        let response = await fetch(URL, {
            method : "GET",
            headers : {"content-type" : "application/json"}
        });
        if (response.ok) { 
            responseData = await response.json();
            return responseData;
        } else {
            throw new Error("There was an error fetching the data. Please try again later.");
        }        
    } catch (error) {
        console.error(error);
    }
}

function setLocalStorage(localStorageData, localStorageItem) {
    try {
        localStorage.setItem(localStorageItem, JSON.stringify(localStorageData));
    } catch(error) {
        console.error(error);
    }
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

function populateMainSection() {
    let mainSection = document.getElementById("mainContainer");
    let categoryContainer = document.createElement("div");
    categoryContainer.id = "categoryContainer";
    let ingredientContainer = document.createElement("div");
    ingredientContainer.id = "ingredientContainer";
    let randomContainer = document.createElement("div");
    randomContainer.id = "randomContainer";
    let alphabetContainer = document.createElement("div");
    alphabetContainer.id = "alphabetContainer";
    let areaContainer = document.createElement("div");
    areaContainer.id = "areaContainer";

    populateCategorySection(categoryContainer);
    populateIngredientSection(ingredientContainer);
    populateRandomSection(randomContainer);
    populateAlphabetSection(alphabetContainer);
    populateAreaSection(areaContainer);
    mainSection.append(categoryContainer, ingredientContainer, randomContainer, alphabetContainer, areaContainer);
}

async function populateCategorySection(categoryContainer) {
    let categoryData = await getData(categoryURL);
    // console.log(categoryData);
    let categoryTitle = document.createElement("div");
    categoryTitle.id = "categoryTitle";
    categoryContainer.appendChild(categoryTitle);
    categoryData.forEach(category => {
        let categoryCard = document.createElement("div");
        categoryCard.id = "categoryCard";
        let categoryImgContainer = document.createElement("div");
        categoryImgContainer.id = "categoryImgContainer";
        let categoryImg = document.createElement("img");
        categoryImg.src = `${category['strCategoryThumb']}`;
        categoryImgContainer.appendChild(categoryImg);
        let categoryTitleContainer = document.createElement("div");
        categoryTitleContainer.id = "categoryTitleContainer";
        categoryTitleContainer.innerText = `${category['strCategory']}`;

        categoryCard.append(categoryImgContainer, categoryTitleContainer);
        categoryContainer.appendChild(categoryCard);

        categoryCard.addEventListener("click", () => {
            setLocalStorage(category, "category");
            window.location.href = "./content.html";
        });
    });
}

async function populateIngredientSection(ingredientContainer) {
    let ingredientData = await getData(ingredientURL);
    // console.log(ingredientData);
    let ingredientTitle = document.createElement("div");
    ingredientTitle.id = "ingredientTitle";
    ingredientContainer.appendChild(ingredientTitle);
    ingredientData.forEach(ingredient => {
        let ingredientCard = document.createElement("div");
        ingredientCard.id = "ingredientCard";
        let ingredientImgContainer = document.createElement("div");
        ingredientImgContainer.id = "categoryImgContainer";
        let ingredientImg = document.createElement("img");
        ingredientImg.src = `${ingredient['strMealThumb']}`;
        ingredientImgContainer.appendChild(ingredientImg);
        let ingredientTitleContainer = document.createElement("div");
        ingredientTitleContainer.id = "ingredientTitleContainer";
        ingredientTitleContainer.innerText = `${ingredient['strMeal']}`;

        ingredientCard.append(ingredientImgContainer, ingredientTitleContainer);
        ingredientContainer.appendChild(ingredientCard);

        ingredientCard.addEventListener("click", () => {
            setLocalStorage(ingredient, "ingredients");
            window.location.href = "./content.html";
        });
    });
}

async function populateRandomSection(randomContainer) {
    let randomData = await getData(randomURL);
    // console.log(randomData);
    let randomTitle = document.createElement("div");
    randomTitle.id = "randomTitle";
    randomTitle.innerText = "Recipe of the Day!" + `${randomData[0]['strMeal']}`;
    let randomImgContainer = document.createElement("div");
    randomImgContainer.id = "randomImgContainer";
    let randomImg = document.createElement("img");
    randomImg.src = `${randomData[0]['strMealThumb']}`;
    randomImgContainer.appendChild(randomImg);
    randomContainer.append(randomTitle, randomImgContainer);

    randomContainer.addEventListener("click", () => {
        setLocalStorage(randomData, "randomData");
        window.location.href = "./content.html";
    });
}

async function populateAlphabetSection(alphabetContainer) {
    //let alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let alphabetTitle = document.createElement("div");
    alphabetTitle.id = "alphabetTitle";
    alphabetTitle.innerText = "Select cuisines based on alphabets.";
    alphabetContainer.appendChild(alphabetTitle);
    alphabetArray.forEach(alphabet => {
        let alphabetCard = document.createElement("div");
        alphabetCard.id = "alphabetCard";
        alphabetCard.innerHTML = `<a href=${alphabetURL + alphabet}>${alphabet}</a>`;
        alphabetContainer.appendChild(alphabetCard);

        alphabetCard.addEventListener("click", () => {
            setLocalStorage(getData(alphabetURL + alphabet), "alphabet");
            window.location.href = "./content.html";
        });
    });  
}

async function populateAreaSection(areaContainer) {
    let areaTitle = document.createElement("div");
    areaTitle.id = "areaTitle";
    areaTitle.innerText = "Select cuisines based on country";
    areaContainer.appendChild(areaTitle);
    for(country of listOfCountries) {
        let areaCard = document.createElement("div");
        areaCard.classList.add("areadCard");
        areaCard.id = "areaCard" + `${country[0]}`;
        areaCard.innerHTML = `<a href='${areaURL}${country[0]}'><img src='${country[1]}'></a>`;
        // console.log(`<ahref=${areaURL} + ${country[0]}></a>`);
        areaContainer.appendChild(areaCard);

        areaCard.addEventListener("click", () => {
            setLocalStorage(getData(areaURL + country[0]), "area");
            window.location.href = "./content.html";
        });
    }
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
