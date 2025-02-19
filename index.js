/**
 * Code for Landing page
 */
const URL = "https://pricey-atom-muskox.glitch.me/data";

window.addEventListener("load", async () => {
    let arrayOfUsers = await getCredentials();
    populateLogin(arrayOfUsers);
});

async function getCredentials() {
    let arrayOfUsers;
    try {
        let response = await fetch(URL, {method : "GET"});
        if (response.ok) {
            localStorage.setItem("arrayOfUsers", JSON.stringify(await response.json())); 
            arrayOfUsers = JSON.parse(localStorage.getItem("arrayOfUsers"));  
        } else {
            throw new Error("Failed to get login data. Please try again after some time.")
        }
        return arrayOfUsers;
    } catch(error) {
        console.log(error.message);
    }
}

function checkCredentials(arrayOfUsers) {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let isUserPresent = false;
    for(user in arrayOfUsers) {
        if (Object.values(arrayOfUsers[user]).includes(emailInput.value) && Object.values(arrayOfUsers[user]).includes(passwordInput.value)) {
            isUserPresent = true;
        }
    };
    return isUserPresent;
}

async function postCredentials(userDetails) {
    try {
        let response = await fetch(URL, {
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(userDetails)
        });
        if (response.ok) {
            console.log("Data saved successfully");
            return true;
        } else {
            throw new Error("Failed to save user data. Please try again after some time.");
        }
    } catch(error) {
        console.error(error.message);
    }
}

function populateLogin(arrayOfUsers) {
    let mainContainer = document.getElementById("maincontainer");
    let divContainer = document.createElement("div");
    divContainer.id = "divContainer";
    let loginEmail = document.createElement("input");
    let loginPass = document.createElement("input");
    let signUpLink = document.createElement("a");
    signUpLink.id = "signUpLink";
    let forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.id = "forgotPasswordLink";
    forgotPasswordLink.innerText = "Help me out I forgot my password";
    signUpLink.innerText = "Wanna join the club? Come on in!";
    loginEmail.setAttribute("type", "text");
    loginEmail.id = "email";
    loginPass.setAttribute("type", "password");
    loginPass.id = "password";
    loginEmail.setAttribute("placeholder", "Enter your email");
    loginPass.setAttribute("placeholder", "Enter your password");
    let button = document.createElement("button");
    button.id = "loginbutton";
    button.innerText = "Click me";
    let loginError = document.createElement("div");
    loginError.className = "loginError";
    loginError.innerText = "Invalid Credentials. Please check your credentials and try again."
    divContainer.append(loginError, loginEmail, loginPass, button, signUpLink, forgotPasswordLink);
    mainContainer.appendChild(divContainer);
    document.body.appendChild(mainContainer);

    button.addEventListener("click", () => {
        if (checkCredentials(arrayOfUsers)) {
        window.location.href = "./home.html";
    } else {
        loginError.style.display = "block";
    }  
    });

    populateForgotPassword(mainContainer, forgotPasswordLink, arrayOfUsers, signUpLink);

    populateSignUp(mainContainer, signUpLink, arrayOfUsers, forgotPasswordLink);
}

function populateSignUp(mainContainer, signUpLink, arrayOfUsers, forgotPasswordLink) {    
    signUpLink.addEventListener("click", () => {
        mainContainer.innerHTML = ''
        let signEmail = document.createElement("input");
        signEmail.id = "email";
        signEmail.setAttribute("type", "text");
        signEmail.setAttribute("placeholder", "Enter your email");
        let signPass = document.createElement("input");
        signPass.setAttribute("type", "password");
        signPass.id = "password";
        signPass.setAttribute("placeholder", "Enter your password");
        let text = document.createElement("p");
        let button = document.createElement("button");
        button.innerText = "Count me in!";
        button.addEventListener("click", () => {
            if(checkCredentials(arrayOfUsers)) {
                text.innerText = "Looks like you're already a member. Refresh the page to login or if you don't remember it, click the forgot password link below."
            } else {
                if(postCredentials(Object({"username" : `${signEmail.value}`, "password" : `${signPass.value}`}))) {
                    text.innerText = "We got your credentials. You can refresh the page to login.";
                } else {
                    text.innerText = "Uh-oh! we are unable to save your credentials due to a technical issue. Try again after some time.";
                }
            }
        })
        mainContainer.append(signEmail, signPass, text, button, forgotPasswordLink);
    })

    
}

function populateForgotPassword(mainContainer, forgotPasswordLink, arrayOfUsers, signUpLink) {
    forgotPasswordLink.addEventListener("click", () => {
        mainContainer.innerHTML = ''
        let loginEmail = document.createElement("input");
        loginEmail.id = "email";
        loginEmail.setAttribute("type", "text");
        loginEmail.setAttribute("placeholder", "Enter your email");
        let passwordText = document.createElement("div");
        let secretPass = document.createElement("p");
        passwordText.className = "showPassword";
        passwordText.innerText = "We're gonna display your password for 5 seconds on the screen. Note it down before it's gone. Once done, refresh the page to go back to login."
        passwordText.appendChild(secretPass);
        let button = document.createElement("button");
        button.innerText = "Show me!";
        button.addEventListener("click", () => {
            for(user in arrayOfUsers) {
                if(Object.values(arrayOfUsers[user]).includes(loginEmail.value)) {
                    secretPass.textContent = `${arrayOfUsers[user]['password']}`;
                    setTimeout(() => {
                        secretPass.style.display = "none";
                    }, 5000);
                } else {
                    secretPass.textContent = "Looks like you are not in the club.";
                    signUpLink.style.display = "block";
                }
                }       
        });
        mainContainer.append(loginEmail, button, passwordText, signUpLink);
    })
}





