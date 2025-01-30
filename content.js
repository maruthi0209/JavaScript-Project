/**
 *  Code for Content page
 */
window.addEventListener("load", () => {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerText = `${JSON.stringify(getLocalStorage("area"))}`;
    console.log(getLocalStorage("area"), typeof getLocalStorage("area"));
});

function getLocalStorage(localStorageItem) {
    let localStorageData = JSON.parse(localStorage.getItem(localStorageItem));
    return localStorageData;
}