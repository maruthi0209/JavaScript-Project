/**
 * Code for Home page
 */
const categoryURL = "https://pricey-atom-muskox.glitch.me/categories";
const categorySearchURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const ingredientURL = "https://pricey-atom-muskox.glitch.me/ingredient";
const randomURL = "https://pricey-atom-muskox.glitch.me/random";
const alphabetURL = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const alphabetArray = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));  // source : https://hasnode.byrayray.dev/how-to-generate-an-alphabet-array-with-javascript
const areaURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const idURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
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
        // let response = await fetch(URL, {
        //     method : "GET",
        //     headers : {"content-type" : "application/json", "Access-Control-Allow-Origin": "*"}
        // });
        let response = await fetch(URL);
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

function returnModal(name) {
    let modalName = document.createElement("div");
    modalName.id = `${name}` + "Modal";
    modalName.style.display = "none";
    return modalName;
}
function returnBackButton(containerName) {
    let backButtonContainer = document.createElement("div");
    backButtonContainer.id = "backButtonCategoryContainer";
    let backButton = document.createElement("button");
    backButton.id = "backbuttonCategory";
    backButton.textContent = "Back to Recipes"
    backButton.addEventListener("click",() => {
        containerName.innerHTML = '';
        containerName.style.display = "none";
    });
    backButtonContainer.appendChild(backButton);
    return backButtonContainer;
}

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
    let cartLink = document.createElement("a");
    cartLink.href = "./cart.html";
    cartLink.innerText = "Cart";
    let userIcon = document.createElement("a");
    userIcon.href = "./index.html";
    userIcon.innerHTML = "<img src='./icons8-user-100.png'><figcaption>Log Out</figcaption>"; // https://img.icons8.com/?size=100&id=JesOX3f2LVdM&format=png&color=000000
    navLinksContainer.append(cartLink, userIcon);
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
    let categoryTitle = document.createElement("div");
    categoryTitle.id = "categoryTitle";
    let categoryModal = returnModal("category");
    categoryContainer.append(categoryTitle, categoryModal);
    categoryData.forEach(async category => {
        let listOfRecipes = await getData(categorySearchURL + `${category['strCategory']}`)
        // console.log(category);
        let categoryCard = document.createElement("div");
        categoryCard.id = "categoryCard" + `${category['strCategory']}`;
        let categoryImgContainer = document.createElement("div");
        categoryImgContainer.id = "categoryImgContainer"+ `${category['strCategory']}`;
        let categoryImg = document.createElement("img");
        categoryImg.src = `${category['strCategoryThumb']}`;
        categoryImgContainer.appendChild(categoryImg);
        let categoryTitleContainer = document.createElement("div");
        categoryTitleContainer.id = "categoryTitleContainer"+ `${category['strCategory']}`;
        categoryTitleContainer.innerText = `${category['strCategory']}`;
        categoryCard.append(categoryImgContainer, categoryTitleContainer);
        categoryContainer.appendChild(categoryCard);
        categoryCard.addEventListener("click", () => {
            categoryModal.style.display = "block";
            displayCategoryModal(categoryModal, category, listOfRecipes);
        });
    });
}

function displayCategoryModal(categoryModal, category, listOfRecipes) {
    let backButtonContainer = returnBackButton(categoryModal);
    let contentContainer = document.createElement("div");
    contentContainer.id = "contentContainerCategory" + `${category['strCategory']}`;
    let strCategory = document.createElement("div");
    strCategory.id = "strCategory";
    // let strCategoryThumbContainer = document.createElement("div");
    // strCategoryThumbContainer.id = "strCategoryThumbContainer";
    // let strCategoryThumb = document.createElement("img");
    // strCategoryThumb.innerHTML = `<img src=${category['strCategoryThumb']}>`;
    // strCategoryThumbContainer.appendChild(strCategoryThumb);
    let strCategoryDescription = document.createElement("div");
    strCategoryDescription.innerText = `${category['strCategoryDescription']}`;
    // console.log(listOfRecipes);
    listOfRecipes['meals'].forEach( async meal => {
        // console.log(meal);
        let strCategoryRecipes = document.createElement("div");
        strCategoryRecipes.id = "strCategoryRecipes"+ `${meal['strMeal']}`;
        strCategoryRecipes.innerText = `${meal['strMeal']}`;
        let strCategoryThumbContainer = document.createElement("div");
        strCategoryThumbContainer.id = "strCategoryThumbContainer" + `${meal['strMeal']}`;
        strCategoryThumbContainer.innerHTML = `<img src=${meal['strMealThumb']}>`;
        strCategoryRecipes.appendChild(strCategoryThumbContainer);
        contentContainer.appendChild(strCategoryRecipes);
        strCategoryRecipes.addEventListener("click", async () => {
            await getData(idURL + `${meal['idMeal']}`);
            // console.log((await getData(idURL + `${meal['idMeal']}`))['meals']);
            setLocalStorage((await getData(idURL + `${meal['idMeal']}`))['meals'][0], "randomData");
            window.location.href = "./randomData.html";
        });
    });
    contentContainer.append(strCategory, strCategoryDescription);//, strCategoryThumbContainer);
    categoryModal.append(backButtonContainer, contentContainer);
}

async function populateIngredientSection(ingredientContainer) {
    let ingredientData = await getData(ingredientURL);
    // console.log(ingredientData);
    let ingredientTitle = document.createElement("div");
    ingredientTitle.id = "ingredientTitle";
    ingredientContainer.appendChild(ingredientTitle);
    ingredientData.forEach(async ingredient => {
        let ingredientRecipeInfo = await getData(idURL + `${ingredient['idMeal']}`);
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
            // console.log(ingredientRecipeInfo);
            setLocalStorage(ingredientRecipeInfo['meals'][0], "randomData");
            window.location.href = "./randomData.html";
        });
    });
}

async function populateRandomSection(randomContainer) {
    let randomDataArray = await getData(randomURL);
    setTimeout(() => {
    let randomData = randomDataArray[Math.floor(Math.random() * 6)]; // source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    // console.log(randomData);
    let randomTitle = document.createElement("div");
    randomTitle.id = "randomTitle";
    randomTitle.innerText = "Recipe of the Day!" + `${randomData['strMeal']}`;
    let randomImgContainer = document.createElement("div");
    randomImgContainer.id = "randomImgContainer";
    randomImgContainer.innerHTML = `<img src=${randomData['strMealThumb']}>`
    randomContainer.append(randomTitle, randomImgContainer);
    randomContainer.addEventListener("click", () => {
        setLocalStorage(randomData, "randomData");
        window.location.href = "./randomData.html";
    });
    }, 2000);
}

function populateAlphabetSection(alphabetContainer) {
    //let alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let alphabetTitle = document.createElement("div");
    alphabetTitle.id = "alphabetTitle";
    alphabetTitle.innerText = "Select cuisines based on alphabets.";
    let alphabetModal = returnModal("alphabet");
    alphabetContainer.append(alphabetTitle, alphabetModal);
    alphabetArray.forEach(alphabet => {
        let alphabetCard = document.createElement("div");
        alphabetCard.id = "alphabetCard" + `${alphabet}`;
        alphabetCard.innerText = `${alphabet}`;
        alphabetContainer.appendChild(alphabetCard);

        alphabetCard.addEventListener("click", async () => {
            let alphabetData = await getData(alphabetURL + alphabet);
            // console.log(alphabetData);
            alphabetModal.style.display = "block";
            displayAlphabetModal(alphabetModal, alphabetData);
        });
    });  
}

function displayAlphabetModal(alphabetModal, alphabetData) {
    let backButtonContainer = returnBackButton(alphabetModal);
    alphabetModal.appendChild(backButtonContainer);
    let contentContainer = document.createElement("div");
    contentContainer.id = "contentContainerAlphabet";
    alphabetData['meals'].forEach(meal => {
        let alphabetCard = document.createElement("div");
        alphabetCard.id = "alphabetCard";
        let mealName = document.createElement("div");
        mealName.id = "mealName";
        mealName.innerText = `${meal['strMeal']}`;
        let mealCategory = document.createElement("div");
        mealCategory.id = "mealCategory";
        mealCategory.innerText = `${meal['strCategory']}`;
        let strMealThumbcontainer = document.createElement("div");
        strMealThumbcontainer.id = "strMealThumbcontainer";
        strMealThumbcontainer.innerHTML = `<img src=${meal['strMealThumb']}>`;
        alphabetCard.append(mealName, mealCategory, strMealThumbcontainer);
        alphabetCard.addEventListener("click", () => {
            setLocalStorage(meal, "randomData");
            window.location.href = "./randomData.html";
        });
        contentContainer.appendChild(alphabetCard);
        alphabetModal.appendChild(contentContainer);
    });    
}


function populateAreaSection(areaContainer) {
    let areaTitle = document.createElement("div");
    areaTitle.id = "areaTitle";
    areaTitle.innerText = "Select cuisines based on country";
    let areaModal = returnModal("area");
    areaContainer.append(areaTitle, areaModal);
    listOfCountries.forEach((value, key, map) => {
        let areaCard = document.createElement("div");
        areaCard.id = "areaCard" + `${key}`;
        areaCard.innerHTML = `<img src=${value}>`;
        areaCard.addEventListener("click", async () => {
            let areaData = await getData(areaURL + `${key}`);
            areaModal.style.display = "block";
            displayAreaModal(areaModal, areaData);
        });
        areaContainer.appendChild(areaCard);
    });
}

function displayAreaModal(areaModal, areaData) {
    let backButtonContainer = returnBackButton(areaModal);
    areaModal.appendChild(backButtonContainer);
    let contentContainer = document.createElement("div");
    contentContainer.id = "contentContainerArea"; 
    areaData['meals'].forEach(meal => {
        let mealsCard = document.createElement("div");
        mealsCard.id = "mealsCard";
        let mealName = document.createElement("div");
        mealName.id = "mealName";
        mealName.innerText = `${meal['strMeal']}`
        let mealThumb = document.createElement("div");
        mealThumb.id = "mealThumb";
        mealThumb.innerHTML = `<img src=${meal['strMealThumb']}>`;
        mealsCard.append(mealName, mealThumb);
        mealsCard.addEventListener("click", async () => {
            let mealId = await getData(idURL + `${meal['idMeal']}`);
            console.log(mealId)
            setLocalStorage(mealId['meals'][0], "randomData");
            window.location.href = "./randomData.html";
        });
        contentContainer.appendChild(mealsCard);
    });
    areaModal.appendChild(contentContainer);
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
